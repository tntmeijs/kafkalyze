import { useState } from "react";
import { ProduceJsonEvent } from "../../components/tools/events/produce/json/ProduceJsonEvent";
import { ProduceXmlEvent } from "../../components/tools/events/produce/ProduceXmlEvent";
import { ProduceAvroEvent } from "../../components/tools/events/produce/ProduceAvroEvent";
import { ProduceProtobufEvent } from "../../components/tools/events/produce/ProduceProtobufEvent";

const TABS = [
    { name: "JSON", element: <ProduceJsonEvent /> },
    { name: "XML", element: <ProduceXmlEvent /> },
    { name: "AVRO", element: <ProduceAvroEvent /> },
    { name: "Protobuf", element: <ProduceProtobufEvent /> }
];

export const ProduceEventsPage = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return (
        <div className="box">
            <div className="block">
                <div className="tabs is-boxed">
                    <ul>
                        {TABS.map((tab, index) => (
                            <li key={index} className={activeTabIndex === index ? "is-active" : ""}>
                                <a onClick={() => setActiveTabIndex(index)}>{tab.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="block">
                {TABS[activeTabIndex].element}
            </div>
        </div>
    );
};
