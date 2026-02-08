"use client";

import { useReveal } from "@/hooks/system/useReveal";
import { BlogCard } from "./BlogCard";

const posts = [
    {
        image: "https://images.unsplash.com/photo-1542204111-970c9228ebca?w=800",
        category: "Design",
        title: "Migrating to Linear 101",
        description: "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
        author: {
            name: "Phoenix Baker",
            avatar: "https://i.pravatar.cc/150?u=phoenix",
            date: "19 Jan 2026"
        }
    },
    {
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
        category: "Software",
        title: "Building your API Stack",
        description: "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
        author: {
            name: "Lana Steiner",
            avatar: "https://i.pravatar.cc/150?u=lana",
            date: "18 Jan 2026"
        }
    },
    {
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
        category: "Leadership",
        title: "Bill Walsh leadership lessons",
        description: "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
        author: {
            name: "Alec Whitten",
            avatar: "https://i.pravatar.cc/150?u=alec",
            date: "17 Jan 2026"
        }
    },
    {
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
        category: "Product",
        title: "PM mental models",
        description: "Mental models are simple expressions of complex processes or relationships.",
        author: {
            name: "Demi Wilkinson",
            avatar: "https://i.pravatar.cc/150?u=demi",
            date: "16 Jan 2026"
        }
    },
    {
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=800",
        category: "Design",
        title: "What is Wireframing?",
        description: "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
        author: {
            name: "Candice Wu",
            avatar: "https://i.pravatar.cc/150?u=candice",
            date: "15 Jan 2026"
        }
    },
    {
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800",
        category: "Collaboration",
        title: "How collaboration makes us better",
        description: "Collaboration can make our teams stronger, and our individual designs better.",
        author: {
            name: "Natali Craig",
            avatar: "https://i.pravatar.cc/150?u=natali",
            date: "14 Jan 2026"
        }
    },
    {
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
        category: "Design",
        title: "Our top 10 Javascript frameworks",
        description: "Javascript frameworks make development easy with extensive features and functionalities.",
        author: {
            name: "Drew Cano",
            avatar: "https://i.pravatar.cc/150?u=drew",
            date: "13 Jan 2026"
        }
    },
    {
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
        category: "Tools",
        title: "Podcast: Creating a better CX Community",
        description: "Starting a community doesn't need to be complicated, but how do you get started?",
        author: {
            name: "Orlando Diggs",
            avatar: "https://i.pravatar.cc/150?u=orlando",
            date: "12 Jan 2026"
        }
    },
    {
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
        category: "Product",
        title: "How collaboration makes us better designers",
        description: "Collaboration can make our teams stronger, and our individual designs better.",
        author: {
            name: "Andi Lane",
            avatar: "https://i.pravatar.cc/150?u=andi",
            date: "11 Jan 2026"
        }
    }
];

export function BlogGrid() {
    const { ref, isVisible } = useReveal();

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div ref={ref} className={`space-y-12 reveal ${isVisible ? 'visible' : ''}`}>
                <h2 className="text-3xl font-black text-black tracking-tight">
                    Recent blog posts
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {posts.map((post, index) => (
                        <div
                            key={post.title}
                            className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <BlogCard {...post} />
                        </div>
                    ))}
                </div>

                <div className="pt-12 flex justify-center">
                    <button className="bg-black text-white px-8 py-3 rounded-lg font-black tracking-tight hover:bg-[#ca8a04] transition-colors interactive-button">
                        Loading more...
                    </button>
                </div>
            </div>
        </section>
    );
}
