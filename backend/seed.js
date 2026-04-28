import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Clear existing data
  await prisma.homestay.deleteMany({});
  await prisma.tourismPlace.deleteMany({});
  
  // Create places
  const place1 = await prisma.tourismPlace.create({
    data: {
      name: "Emerald Lake",
      description: "A pristine alpine lake surrounded by majestic peaks. Perfect for hiking and photography.",
      imageUrl: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1000&auto=format&fit=crop",
      location: "North Cascades"
    }
  });

  const place2 = await prisma.tourismPlace.create({
    data: {
      name: "Sunset Valley",
      description: "Famous for its breathtaking twilight views and rolling hills covered in wildflowers.",
      imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop",
      location: "Highland County"
    }
  });

  const place3 = await prisma.tourismPlace.create({
    data: {
      name: "Mystic Forest",
      description: "Ancient woodlands with towering trees and hidden waterfalls waiting to be explored.",
      imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1000&auto=format&fit=crop",
      location: "Redwood Region"
    }
  });

  const place4 = await prisma.tourismPlace.create({
    data: {
      name: "Crystal Beach",
      description: "A pristine white-sand beach with crystal clear waters perfect for swimming, surfing, and relaxing.",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
      location: "Coastal Region"
    }
  });

  const place5 = await prisma.tourismPlace.create({
    data: {
      name: "Snowy Peaks",
      description: "A winter wonderland offering top-notch skiing, snowboarding, and cozy fireside evenings.",
      imageUrl: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1000&auto=format&fit=crop",
      location: "Alpine Mountains"
    }
  });

  const place6 = await prisma.tourismPlace.create({
    data: {
      name: "Historic City Center",
      description: "Wander through cobblestone streets, ancient architecture, and vibrant local markets.",
      imageUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1000&auto=format&fit=crop",
      location: "Old Town"
    }
  });

  // Create homestays
  await prisma.homestay.createMany({
    data: [
      {
        name: "Cozy Cabin Retreat",
        description: "A beautiful wooden cabin with a fireplace, perfect for a romantic getaway or a small family trip.",
        pricePerNight: 120,
        imageUrl: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1000&auto=format&fit=crop",
        tourismPlaceId: place1.id
      },
      {
        name: "Lakeside Villa",
        description: "Wake up to the sound of water gently lapping against the shore. This luxurious villa offers direct lake access.",
        pricePerNight: 250,
        imageUrl: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1000&auto=format&fit=crop",
        tourismPlaceId: place1.id
      },
      {
        name: "Valley View Cottage",
        description: "Experience the best sunsets from your private balcony in this charming valley cottage.",
        pricePerNight: 95,
        imageUrl: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1000&auto=format&fit=crop",
        tourismPlaceId: place2.id
      },
      {
        name: "Forest Haven Homestay",
        description: "Immerse yourself in nature in this eco-friendly homestay surrounded by ancient trees.",
        pricePerNight: 85,
        imageUrl: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?q=80&w=1000&auto=format&fit=crop",
        tourismPlaceId: place3.id
      },
      {
        name: "Seaside Bungalow",
        description: "Step right out onto the sand from this airy and bright bungalow by the sea.",
        pricePerNight: 180,
        imageUrl: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1000&auto=format&fit=crop",
        tourismPlaceId: place4.id
      },
      {
        name: "Oceanfront Condo",
        description: "Modern condo with panoramic ocean views and a private wrap-around deck.",
        pricePerNight: 220,
        imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
        tourismPlaceId: place4.id
      },
      {
        name: "Ski Lodge Master Suite",
        description: "A cozy suite right on the mountain with ski-in/ski-out access and a hot tub.",
        pricePerNight: 350,
        imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1000&auto=format&fit=crop",
        tourismPlaceId: place5.id
      },
      {
        name: "Heritage Townhouse",
        description: "Stay in a restored 18th-century townhouse right in the heart of the historic district.",
        pricePerNight: 150,
        imageUrl: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1000&auto=format&fit=crop",
        tourismPlaceId: place6.id
      }
    ]
  });

  console.log('Database seeded successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
