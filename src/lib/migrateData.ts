import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

// Dummy data to migrate
const dummyProperties = [
  {
    title: "Luxury Marina Apartment with Sea View",
    price: "AED 170,200 /yr",
    location: "Dubai Marina, Dubai",
    beds: 1,
    baths: 1,
    area: "823 sq-ft",
    type: "rent",
    status: "available",
    description: "Stunning luxury apartment with panoramic sea views in the heart of Dubai Marina.",
    developer: "Emaar",
    amenities: "Pool, Gym, Parking, Balcony",
    image: "/src/assets/property-1.jpg" // This will be uploaded
  },
  {
    title: "Modern Villa with Private Pool",
    price: "AED 3,000,000",
    location: "Palm Jumeirah, Dubai",
    beds: 4,
    baths: 5,
    area: "3,548 sq-ft",
    type: "sale",
    status: "available",
    description: "Exclusive modern villa with private pool and stunning Palm Jumeirah views.",
    developer: "Nakheel",
    amenities: "Private Pool, Garden, Maid's Room, Parking",
    image: "/src/assets/property-2.jpg"
  },
  {
    title: "Premium Penthouse | Panoramic Views",
    price: "AED 5,200,000",
    location: "Downtown Dubai",
    beds: 3,
    baths: 4,
    area: "4,815 sq-ft",
    type: "sale",
    status: "available",
    description: "Luxurious penthouse with breathtaking panoramic views of Dubai's skyline.",
    developer: "Emaar",
    amenities: "Terrace, Jacuzzi, Gym, Concierge",
    image: "/src/assets/property-3.jpg"
  },
  {
    title: "Family Townhouse | Garden View",
    price: "AED 2,042,000",
    location: "Dubai Hills Estate, Dubai",
    beds: 3,
    baths: 3,
    area: "2,100 sq-ft",
    type: "sale",
    status: "available",
    description: "Spacious family townhouse with beautiful garden views in Dubai Hills Estate.",
    developer: "Emaar",
    amenities: "Garden, Parking, Balcony, Storage",
    image: "/src/assets/property-4.jpg"
  },
  {
    title: "Spacious Apartment | Pool View",
    price: "AED 1,170,000",
    location: "JVC, Dubai",
    beds: 1,
    baths: 2,
    area: "846 sq-ft",
    type: "sale",
    status: "available",
    description: "Modern apartment with pool views in the vibrant Jumeirah Village Circle.",
    developer: "Dubai Properties",
    amenities: "Pool, Gym, Parking, Balcony",
    image: "/src/assets/property-3.jpg"
  },
  {
    title: "Beachfront Studio | Fully Furnished",
    price: "AED 95,000 /yr",
    location: "JBR, Dubai",
    beds: 0,
    baths: 1,
    area: "520 sq-ft",
    type: "rent",
    status: "available",
    description: "Fully furnished beachfront studio in the lively Jumeirah Beach Residence.",
    developer: "Dubai Properties",
    amenities: "Beach Access, Pool, Gym, Furnished",
    image: "/src/assets/property-1.jpg"
  },
  {
    title: "Executive Villa | Golf Course View",
    price: "AED 8,500,000",
    location: "Emirates Hills, Dubai",
    beds: 5,
    baths: 6,
    area: "7,200 sq-ft",
    type: "sale",
    status: "available",
    description: "Executive villa with stunning golf course views in prestigious Emirates Hills.",
    developer: "Emaar",
    amenities: "Golf Course View, Private Pool, Maid's Room, Driver's Room",
    image: "/src/assets/property-4.jpg"
  },
  {
    title: "Waterfront Apartment | Maid's Room",
    price: "AED 250,000 /yr",
    location: "Dubai Creek Harbour",
    beds: 2,
    baths: 3,
    area: "1,450 sq-ft",
    type: "rent",
    status: "available",
    description: "Luxurious waterfront apartment with maid's room in Dubai Creek Harbour.",
    developer: "Emaar",
    amenities: "Waterfront, Maid's Room, Pool, Gym",
    image: "/src/assets/property-2.jpg"
  }
];

export const migrateDummyData = async () => {
  console.log("Starting migration of dummy data...");

  for (const property of dummyProperties) {
    try {
      // For now, we'll use placeholder images since we can't easily upload local files
      // In a real scenario, you'd upload the actual images to Firebase Storage
      const propertyData = {
        ...property,
        image: `https://via.placeholder.com/800x600?text=${encodeURIComponent(property.title.substring(0, 20))}`,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      await addDoc(collection(db, "properties"), propertyData);
      console.log(`Migrated: ${property.title}`);
    } catch (error) {
      console.error(`Error migrating ${property.title}:`, error);
    }
  }

  console.log("Migration completed!");
};

// Uncomment the line below and run this file to migrate data
// migrateDummyData();