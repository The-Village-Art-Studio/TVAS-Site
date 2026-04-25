import BlogMerger from "@/components/blog-merger"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Zap, BrainCircuit, Shuffle, DraftingCompass, Rocket } from "lucide-react" // Changed Atom to Rocket
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 sm:py-24">
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 drop-shadow-lg text-foreground leading-tight">
              Ignite Your Genius. <span className="text-primary">Engineer the Unimagined.</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground drop-shadow-sm max-w-3xl mx-auto mb-10">
              Welcome to Creative Flow Studio – your dynamic launchpad for transforming visionary concepts into
              tangible, groundbreaking digital experiences. Sculpt, synthesize, and scale your innovations with
              unparalleled fluidity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/create">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 py-5 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-primary/40"
                >
                  <Rocket className="w-6 h-6 mr-2" />
                  Launch Your Vision
                </Button>
              </Link>
              <Link href="/showcase">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground dark:border-secondary dark:text-secondary dark:hover:bg-secondary dark:hover:text-secondary-foreground px-10 py-5 rounded-lg backdrop-blur-sm transition-colors shadow-md"
                >
                  Explore the Frontier
                </Button>
              </Link>
            </div>
          </div>

          <section className="relative h-[50vh] min-h-[400px] max-h-[600px] overflow-hidden my-16 sm:my-20 rounded-xl shadow-2xl border border-border">
            <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-primary/5 to-background/10"></div>
            <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight">
                  The Genesis Engine: <span className="text-primary">Where Ideas Converge</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our immersive 3D canvas is more than a backdrop—it's a reactive environment, mirroring the dynamic
                  interplay of your thoughts and sparking emergent connections.
                </p>
              </div>
            </div>
          </section>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="bg-card/85 backdrop-blur-lg border shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="mx-auto w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border-2 border-primary/30">
                  <DraftingCompass className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-foreground font-semibold text-lg">Architect with Precision</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-sm">
                  Sculpt intricate designs and complex systems with tools engineered for meticulous detail and flawless
                  execution.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/85 backdrop-blur-lg border shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="mx-auto w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border-2 border-secondary/30">
                  <Zap className="w-7 h-7 text-secondary" />
                </div>
                <CardTitle className="text-foreground font-semibold text-lg">Accelerate Your Flow</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-sm">
                  Navigate your creative process at lightspeed. Intuitive interfaces and rapid processing eliminate
                  friction, keeping you in the zone.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/85 backdrop-blur-lg border shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="mx-auto w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border-2 border-accent/30">
                  <BrainCircuit className="w-7 h-7 text-accent" />
                </div>
                <CardTitle className="text-foreground font-semibold text-lg">Synthesize Brilliance</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-sm">
                  Fuse disparate ideas into cohesive, powerful innovations. Our AI-augmented tools help you discover
                  novel connections and build compelling narratives.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/85 backdrop-blur-lg border shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <CardHeader className="text-center">
                <div className="mx-auto w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border-2 border-primary/30">
                  <Shuffle className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-foreground font-semibold text-lg">Dynamic Creation Canvas</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-sm">
                  Your workspace, alive. Experience an environment that intelligently adapts to your creative rhythm,
                  fostering discovery and evolution.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mb-16">
            <Card className="bg-card/85 backdrop-blur-lg border shadow-xl max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-6">Master the Current</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-muted-foreground">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-primary/15 rounded-full flex items-center justify-center mb-3 border border-primary/30">
                      <span className="text-primary font-bold text-lg">1</span>
                    </div>
                    <span>Drag to explore the 3D space</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-secondary/15 rounded-full flex items-center justify-center mb-3 border border-secondary/30">
                      <span className="text-secondary font-bold text-lg">2</span>
                    </div>
                    <span>Scroll to zoom in and out</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-accent/15 rounded-full flex items-center justify-center mb-3 border border-accent/30">
                      <span className="text-accent font-bold text-lg">3</span>
                    </div>
                    <span>Watch blobs merge and flow</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="blog-merger-section" className="container mx-auto px-4 py-16 scroll-mt-20">
          <BlogMerger />
        </section>
      </main>
    </div>
  )
}
