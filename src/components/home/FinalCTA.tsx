import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { WA_MESSAGES } from "@/lib/wa";

export default function FinalCTA() {
  return (
    <section className="bg-brand-red py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-section-h2 uppercase text-text-primary">
          Start Watching Today
        </h2>
        <p className="mt-4 text-lg text-text-primary/80 max-w-2xl mx-auto">
          Join over 100,000 UK subscribers streaming live TV, sports, movies,
          and more in 4K quality. Get started in under 5 minutes.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <WhatsAppButton
            message={WA_MESSAGES.getStarted}
            variant="white"
            size="lg"
          >
            Get Started &mdash; &pound;9.99/mo
          </WhatsAppButton>
          <WhatsAppButton
            message={WA_MESSAGES.freeTrial}
            variant="secondary"
            size="lg"
            className="border-text-primary/30 text-text-primary hover:bg-text-primary/10"
          >
            Free Trial via WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
