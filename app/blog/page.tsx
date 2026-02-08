import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogHero, BlogGrid, BlogCTA } from "@/components/blog";

export default function BlogPage() {
    return (
        <div className="bg-white h-screen overflow-auto">
            <Header />
            <main>
                <BlogHero />
                <BlogGrid />
                <BlogCTA />
            </main>
            <Footer />
        </div>
    );
}
