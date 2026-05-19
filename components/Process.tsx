const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We talk about your project, goals, and budget. No forms, no pressure — just a straightforward conversation to make sure we're the right fit.",
  },
  {
    num: "02",
    title: "Proposal",
    desc: "You receive a clear proposal — scope, timeline, and price. Everything agreed in writing before any work begins. No hidden costs.",
  },
  {
    num: "03",
    title: "Build & Review",
    desc: "I execute and keep you in the loop at every stage. You review, give feedback, and we refine until it's exactly right.",
  },
  {
    num: "04",
    title: "Launch",
    desc: "We go live. You get full ownership — files, accounts, access to everything. I stay available after launch for questions and adjustments.",
  },
];

export default function Process() {
  return (
    <section className="process section" id="process">
      <div className="container">
        <h2 data-animate>How it works</h2>
        <p className="muted" data-animate data-delay="100">
          A simple, transparent process from first message to launch.
        </p>
        <div className="process-steps">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="process-step"
              data-animate
              data-delay={i * 120}
            >
              <div className="process-num-circle">
                <span>{step.num}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="process-connector" aria-hidden="true" />
              )}
              <h3 className="process-title">{step.title}</h3>
              <p className="process-desc muted">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="process-cta" data-animate>
          <a className="btn btn-primary-glow" href="#contact">Start with a free call</a>
        </div>
      </div>
    </section>
  );
}
