import { ContactModel } from "../db/models/contact.model.js";

export class ContactRepository {
  async create(data) {
    const doc = await ContactModel.create({
      name: data.name,
      email: data.email,
      subject: data.subject ?? "",
      message: data.message,
      status: "new"
    });
    return this.map(doc);
  }

  async list(params = {}) {
    const { page = 1, limit = 20 } = params;
    const [data, total] = await Promise.all([
      ContactModel.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      ContactModel.countDocuments()
    ]);
    return {
      data: data.map((doc) => this.map(doc)),
      total
    };
  }

  map(doc) {
    return {
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      subject: doc.subject ?? "",
      message: doc.message ?? "",
      status: doc.status ?? "new",
      createdAt: doc.createdAt
    };
  }
}
