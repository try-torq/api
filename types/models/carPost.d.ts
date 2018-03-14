declare module models {
  namespace carPost {
    interface Attributes {
      id?: string;
      nickname?: string;
      year?: number;
      saleStatus?: string;
      publishedAt?: Date;
      editedAt?: Date;
      price?: number;
      owner?: string;
      carModel?: string;
      tags?: string[];
    }
  }
}
