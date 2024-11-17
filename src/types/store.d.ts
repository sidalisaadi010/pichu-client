interface Store {
  id: number;
  userId: number;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  isActive: boolean;
  website: string | null;
  slug: string;
  websiteVerified: boolean;
  sslStatus: string | null;
  dnsStatus: string | null;
}

type CreateStore = Partial<Pick<Store, "name" | "slug" | "description">>;
