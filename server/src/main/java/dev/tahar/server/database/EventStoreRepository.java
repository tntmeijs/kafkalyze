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

    @Aggregation(pipeline = {
            """
                    {
                        $project: {
                          year: { $year: { $toDate: "$timestamp" } },
                          month: {
                            $month: { $toDate: "$timestamp" },
                          },
                          day: {
                            $dayOfMonth: { $toDate: "$timestamp" },
                          },
                          hour: { $hour: { $toDate: "$timestamp" } },
                          minute: {
                            $minute: { $toDate: "$timestamp" },
                          },
                        },
                      }
                    """,
            """
                    {
                        $group: {
                          _id: {
                            year: "$year",
                            month: "$month",
                            day: "$day",
                            hour: "$hour",
                            minute: "$minute",
                          },
                          count: { $sum: 1 },
                        },
                      }
                    """,
            """
                    {
                        $project: {
                          _id: 0,
                          date: {
                            $dateToString: {
                              format: "%Y-%m-%d %H:%M",
                              date: {
                                $toDate: {
                                  $concat: [
                                    { $toString: "$_id.year" },
                                    "-",
                                    { $toString: "$_id.month" },
                                    "-",
                                    { $toString: "$_id.day" },
                                    " ",
                                    { $toString: "$_id.hour" },
                                    ":",
                                    { $toString: "$_id.minute" },
                                  ],
                                },
                              },
                            },
                          },
                          count: 1,
                        },
                      }
                    """,
            """
                    {
                        $sort: {
                          date: 1,
                        },
                      }
                    """
    })
    AggregationResults<EventCountPerTimeUnit> aggregateEventConsumedCountPerMinute();

    record EventsPerTopicCount(String topic, long count) {
    }

    record EventCountPerTimeUnit(String date, long count) {
    }

}
