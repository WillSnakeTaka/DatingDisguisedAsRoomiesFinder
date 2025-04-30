
//  id          Int @id @default (autoincrement())
//  name        String @unique
//  category    String ?
//  description String ?
//  iconUrl     String ?

export type hobby = {
    id: number;
    name: string;
    category?: string;
    description?: string;
    iconUrl?: string;
}