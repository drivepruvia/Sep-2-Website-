import { Mail, MapPin, MessageCircle, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-6xl px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <img
            src="/pruvia-logo.png"
            alt="Pruvia"
            width={140}
            height={36}
            className="h-8 w-auto"
          />

          <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
            A guided driver coaching platform helping parents teach teens safe,
            confident driving — beyond what driving school covers.
          </p>
        </div>

        <div>
          <h4 className="text-base text-primary font-semibold tracking-tight">
            Explore
          </h4>

          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#how" className="hover:text-foreground">
                How it works
              </a>
            </li>

            <li>
              <a href="#features" className="hover:text-foreground">
                Features
              </a>
            </li>

            <li>
              <a href="#curriculum" className="hover:text-foreground">
                Curriculum
              </a>
            </li>

            <li>
              <a href="#about" className="hover:text-foreground">
                About
              </a>
            </li>

            <li>
              <a href="#faq" className="hover:text-foreground">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-base text-primary font-semibold tracking-tight">
            Get in touch
          </h4>

          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-accent shrink-0" />

              <a
                href="mailto:hello@pruvia.com"
                className="hover:text-foreground"
              >
                hello@pruvia.com
              </a>
            </li>

            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent shrink-0" />
              <span>Atlanta, Georgia</span>
            </li>

            <li className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-accent shrink-0" />

              <a
                href="https://outlook.office.com/book/TeenDriverParentDicoveryInterviews@gtvault.onmicrosoft.com/?ismsaljsauthenabled"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 whitespace-nowrap hover:text-foreground"
              >
                <span>Chat with us</span>
                <ArrowRight className="w-3 h-3 shrink-0 transition-transform group-hover:translate-x-1" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-5 flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Pruvia. All rights reserved.</span>

          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>

            <a href="#" className="hover:text-foreground">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
