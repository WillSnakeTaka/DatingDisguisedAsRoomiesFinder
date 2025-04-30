/**
 * model Listing {
  id           Int      @id @default(autoincrement())
  title        String
  description  String
  interestPool String[]
  price        Int
  image_url    String?
  location     String?
  category     String?
  is_active    Boolean
  is_featured  Boolean
  createdAt    DateTime @default(now())
  clerkId      String
  user         User     @relation(fields: [clerkId], references: [clerkId])
}
 */
export type Listing = {
    id: number;
    title: string;
    description: string;
    interestPool: string[]; // Interests like "music", "cooking", etc.
    price: number; // price for the listing
    image_url?: string | null; // image_url for the listing
    location?: string | null; // location for the listing
    category?: string | null; // type of listing like apartment, house, etc.
    is_active: boolean; // if the listing is active or not
    is_featured: boolean; // if the listing is featured or not
    createdAt: Date; // Date when the listing was created
    clerkId: string; // Clerk ID, references User.clerkId
}