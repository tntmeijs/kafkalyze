import { Outlet } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { useInterval } from "./hooks/useInterval"
import { checkServerLiveness } from "./services/SystemService";
import { useState } from "react";

import logo from "./assets/logo.png";

const SERVER_OK_INTERVAL_MS = 20_000;
const SERVER_NOT_OK_INTERVAL_MS = 2_500;

const ServerOfflineModal = ({ show }) => (
  <div className={`modal ${show ? "is-active" : ""}`}>
    <div className="modal-background"></div>
    <div className="modal-content">
      <div className="notification">
        <div className="columns">
          <div className="column is-one-third">
            <img src={logo} />
          </div>
        </div>

        <div className="content">
          <h3 className="title">Unable to connect to the Kafkalize server</h3>
          <p>Unfortunately, it is difficult to tell what might have caused this. To help narrow down the root cause, please ensure that:</p>
          <ul>
            <li>Kafkalyze has been installed correctly.</li>
            <li>No error messages show up in the server's output logs.</li>
            <li>Your network configuration does not block Kafkalyze requests.</li>
            <li>The server did not crash.</li>
          </ul>

          <p>Please refer to the server's output logs for more information as the frontend cannot help you with this.</p>
          <p>If you believe that this is an issue in Kafkalize, please <a href="https://github.com/tntmeijs/kafkalyze/issues/new" target="_blank">open an issue</a>.</p>
          <p>Thank you for using Kafkalyze!</p>
        </div>

        <button className="button is-info is-fullwidth is-capitalized" onClick={() => checkServer()}>try again</button>
      </div>
    </div>
  </div>
);

const App = () => {
  const [serverIsAlive, setServerIsAlive] = useState(false);

  useInterval(() => checkServer(), serverIsAlive ? SERVER_OK_INTERVAL_MS : SERVER_NOT_OK_INTERVAL_MS);

  const checkServer = () => checkServerLiveness(
    () => setServerIsAlive(true),
    () => setServerIsAlive(false),
    () => setServerIsAlive(false));

  return (
    <div className="container">
      <Navbar />
      <Outlet />
      <ServerOfflineModal show={!serverIsAlive} />
    </div>
  );
};

export default App
