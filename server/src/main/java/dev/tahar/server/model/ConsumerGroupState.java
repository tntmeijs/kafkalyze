package dev.tahar.server.model;

public enum ConsumerGroupState {
    UNKNOWN,
    PREPARING_REBALANCE,
    COMPLETING_REBALANCE,
    STABLE,
    DEAD,
    EMPTY;
}
