export default function Home() {
  return (
    <div className="container">
      <h1>Salman Shaheen</h1>
      <p className="tagline">
        Product manager building platforms that move money and solve
        problems.
      </p>

      <section>
        <h2>Product</h2>
        <div className="experience-item">
          <div className="role">Product Manager, Platform</div>
          <div className="company">Capital One</div>
        </div>
        <div className="experience-item">
          <div className="role">Product Manager, Mobile</div>
          <div className="company">Capital One</div>
        </div>
      </section>

      <section>
        <h2>Software</h2>
        <div className="experience-item">
          <div className="role">Software Engineer Intern</div>
          <div className="company">AbbVie, StoneX, State Farm</div>
        </div>
      </section>

      <section>
        <h2>Strategy</h2>
        <div className="experience-item">
          <div className="role">Executive Partner</div>
          <div className="company">OTCR Consulting</div>
        </div>
      </section>

      <section>
        <h2>Education</h2>
        <div className="education-item">
          <div className="degree">
            B.S. Computer Science &amp; Economics · Senior 100
          </div>
          <div className="school">
            University of Illinois Urbana-Champaign
          </div>
        </div>
      </section>

      <section>
        <p className="interests">
          When I&apos;m not building products, I&apos;m reading Marvel
          comics, perfecting my AeroPress recipe, or tinkering with side
          projects &amp; AI.
        </p>
      </section>
    </div>
  );
}
