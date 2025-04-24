import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Food Enthusiast",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    content: "LocalFoodie has completely changed how I eat! I've discovered so many amazing local restaurants that I never knew existed in my neighborhood.",
    rating: 5
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Busy Professional",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    content: "The delivery is always on time, and the food arrives hot and fresh. I love supporting local businesses rather than big chains. Great service!",
    rating: 5
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    role: "Restaurant Owner",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    content: "As a restaurant owner, partnering with LocalFoodie has brought us so many new customers. Their platform is easy to use for both restaurants and customers.",
    rating: 4.5
  }
];

export default function Testimonials() {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="ri-star-fill text-accent"></i>);
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="ri-star-half-fill text-accent"></i>);
    }
    
    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<i key={`empty-${i}`} className="ri-star-line text-accent"></i>);
    }
    
    return stars;
  };
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold font-poppins text-center mb-10">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-background p-6 rounded-xl shadow-md">
              <CardContent className="p-0">
                <div className="flex gap-1 text-accent mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-foreground/80 mb-4">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
