import Topics from "../../models/Topic";

export default class TopicsDTO {
  public static async create(name: string) {
    try {
      const topicExists = await Topics.find({ name });

      if (topicExists) throw "Topic already exists";

      await Topics.create({
        name,
      });

      return Promise.resolve();
    } catch (error) {
      return Promise.reject((error as Error).message);
    }
  }

  public static async rename({
    topicId,
    name,
  }: {
    topicId: string;
    name: string;
  }) {
    try {
      await Topics.findByIdAndUpdate(topicId, {
        name,
      });

      return Promise.resolve();
    } catch (error) {
      return Promise.reject((error as Error).message);
    }
  }

  public static async addPublisher({
    topicId,
    publisherId,
  }: {
    topicId: string;
    publisherId: string;
  }) {
    try {
      const topic = await Topics.findById(topicId);

      if (!topic) throw "Topic does not exist";

      await topic.updateOne({ $push: { publishers: publisherId } });

      return Promise.resolve();
    } catch (error) {
      return Promise.reject((error as Error).message);
    }
  }

  public static async removePublisher({
    topicId,
    publisherId,
  }: {
    topicId: string;
    publisherId: string;
  }) {
    try {
      const topic = await Topics.findById(topicId);

      if (!topic) throw "Topic does not exist";

      await topic.updateOne({ $pull: { publishers: publisherId } });

      return Promise.resolve();
    } catch (error) {
      return Promise.reject((error as Error).message);
    }
  }

  public static async delete(topicId: string) {
    try {
      const topic = await Topics.findById(topicId).lean();

      if (!topic) throw "Topic does not exist";
      if (topic.publishers.length > 0)
        throw "Topic receiving data; remove devices first";

      await Topics.findByIdAndDelete(topicId);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject((error as Error).message);
    }
  }
}
