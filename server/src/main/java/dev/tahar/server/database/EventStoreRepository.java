package dev.tahar.server.database;

import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventStoreRepository extends MongoRepository<EventDocument, String> {

    @Aggregation(pipeline = {
            """
                    {
                        $group: {
                        _id: "$topic", count: { $sum: 1 }
                        }
                    }
                    """,
            """
                    {
                        $project: {
                            _id: 0,
                            topic: "$_id",
                            count: "$count"
                        }
                    }
                    """
    })
    AggregationResults<EventsPerTopicCount> aggregateEventsByTopic();

    record EventsPerTopicCount(String topic, Long count) {
    }

}
