import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
            <div className="max-w-2xl text-center space-y-8">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Welcome to DCABot
                </h1>
                <p className="text-xl text-muted-foreground">
                    AI-Powered investment strategies on OneChain.
                    Automate your DCA with ease and precision.
                </p>
                <div className="flex gap-4 justify-center">
                    <Button asChild size="lg" className="rounded-full px-8">
                        <Link to="/dashboard">Get Started</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                        <Link to="/about">Learn More</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
