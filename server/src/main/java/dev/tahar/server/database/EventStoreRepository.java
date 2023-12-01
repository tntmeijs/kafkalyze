package dev.tahar.server.database;

import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventStoreRepository extends MongoRepository<EventDocument, String> {

    @Aggregation(pipeline = {
            "{ $match: { timestamp: { $gte: :#{[0]}, $lte: :#{[1]} } } }",
            "{ $group: { _id: \"$topic\", count: { $sum: 1 } } }",
            "{ $project: { _id: 0, topic: \"$_id\", count: \"$count\" } }"
    })
    AggregationResults<EventsPerTopicCount> aggregateEventCountByTopic(long minTimestampMs, long maxTimestampMs);

    @Aggregation(pipeline = {
            "{ $match: { timestamp: { $gte: :#{[0]}, $lte: :#{[1]} } } }",
            "{ $project: { roundedTimestamp: { $subtract: [\"$timestamp\", { $mod: [\"$timestamp\", :#{[2]}] } ] } } }",
            "{ $group: { _id: \"$roundedTimestamp\", count: { $sum: 1 } } }",
            "{ $limit: :#{[3]} }",
            "{ $project: { _id: 0, timestamp: \"$_id\", count: 1 } }",
            "{ $sort: { timestamp: 1 } }"
    })
    AggregationResults<EventCountPerTimeUnit> aggregateEventConsumedCountPerInterval(long minTimestampMs, long maxTimestampMs, long intervalMs, int limit);

    record EventsPerTopicCount(String topic, long count) {
    }

    record EventCountPerTimeUnit(long timestamp, long count) {
    }

}
