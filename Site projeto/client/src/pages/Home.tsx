import {
  ArrowRight,
  BatteryCharging,
  Bluetooth,
  Bot,
  Box,
  Check,
  ChevronRight,
  CircleDot,
  Cpu,
  Gamepad2,
  Gauge,
  LockKeyhole,
  Menu,
  Move3d,
  Radio,
  Ruler,
  Terminal,
  X,
} from "lucide-react";
import { useState } from "react";

const asset = (name: string) => `${import.meta.env.BASE_URL}images/${name}`;

const plates = [
  {
    image: asset("carrinho-prancha-1.png"),
    code: "01",
    title: "Vista explodida",
    text: "Camadas da case, bateria, tampas e componentes de controle.",
  },
  {
    image: asset("carrinho-prancha-2.png"),
    code: "02",
    title: "Eletrônica",
    text: "Arduino Nano, driver, Bluetooth, conectores e pinos de expansão.",
  },
  {
    image: asset("carrinho-prancha-3.png"),
    code: "03",
    title: "Estrutura externa",
    text: "Rodas, esferas, encaixe frontal, LEDs, interruptor e carga.",
  },
];

const specs = [
  ["Arquitetura", "Diferencial, 2 motores"],
  ["Motores", "N20 · 200 rpm"],
  ["Rodas", "28 mm de diâmetro"],
  ["Estabilização", "2 esferas omnidirecionais"],
  ["Controladora", "Arduino Nano"],
  ["Driver", "TB6612FNG"],
  ["Comunicação", "Bluetooth clássico · HC-05"],
  ["Bateria do carrinho", "2 × 18650 · 2S · 7,4 V nominal"],
  ["Bateria do controle", "1 × 18650 · 1S · TP4056"],
  ["Estrutura", "Impressão 3D em PLA e TPU"],
];

const flow = [
  { icon: BatteryCharging, title: "Energia", text: "A bateria 2S alimenta o carrinho; o controle usa uma célula 1S." },
  { icon: Radio, title: "Comando", text: "O MPU-6050 detecta a inclinação do operador em tempo real." },
  { icon: Bluetooth, title: "Transmissão", text: "O ESP32-S3 envia comandos pelo par de módulos HC-05." },
  { icon: Gauge, title: "Movimento", text: "O Arduino Nano e o TB6612FNG comandam os motores N20." },
];

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p className="section-lead">{text}</p>}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Carrinho Concept3">
          <span className="brand-mark">C3</span>
          <span>Carrinho <b>Concept3</b></span>
        </a>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Navegação principal">
          <a href="#projeto" onClick={closeMenu}>Projeto</a>
          <a href="#especificacoes" onClick={closeMenu}>Especificações</a>
          <a href="#funcionamento" onClick={closeMenu}>Funcionamento</a>
          <a href="#pranchas" onClick={closeMenu}>Pranchas</a>
        </nav>
        <button className="menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow">Kit educacional de robótica · Fase I</p>
            <h1>Aprender ciência<br /><span>fazendo.</span></h1>
            <p className="hero-text">Um kit de baixo custo para integrar Eletrônica, Programação e Física em experiências práticas. O sistema combina um carrinho diferencial e um controle remoto por gestos.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#especificacoes">Ver dados técnicos <ArrowRight size={16} /></a>
              <a className="button button-secondary" href="#pranchas">Abrir pranchas</a>
            </div>
            <div className="hero-note"><span className="status-dot" /> Protótipo funcional em validação laboratorial · TRL 3</div>
          </div>
          <div className="hero-image-wrap">
            <div className="image-label">Carrinho Concept3 · vista explodida</div>
            <img src={asset("carrinho-prancha-1.png")} alt="Vista explodida do Carrinho Concept3" />
          </div>
        </section>

        <section className="intro-section" id="projeto">
          <div className="intro-grid">
            <SectionTitle eyebrow="O projeto" title="Uma plataforma para experimentar." text="O kit faz parte da Plataforma Educacional para Aprendizagem Interdisciplinar em Ciências, Tecnologia e Robótica. Foi desenvolvido em parceria entre o Instituto Federal Farroupilha — Campus São Borja — e a SYSTRONYX." />
            <div className="intro-points">
              <div><Bot size={21} /><h3>Dois módulos</h3><p>Carrinho robótico diferencial e controle remoto baseado em reconhecimento de gestos.</p></div>
              <div><Move3d size={21} /><h3>Três formas de uso</h3><p>Controle por gestos, scripts Python e modo autônomo previsto para fases futuras.</p></div>
              <div><Box size={21} /><h3>Projeto replicável</h3><p>Hardware de baixo custo, documentação aberta e materiais adequados à cultura maker.</p></div>
            </div>
          </div>
        </section>

        <section className="spec-section" id="especificacoes">
          <div className="content-width">
            <SectionTitle eyebrow="Ficha técnica" title="O que existe dentro do carrinho." text="Os principais componentes e parâmetros do sistema, organizados para facilitar a leitura e a reprodução do protótipo." />
            <div className="spec-layout">
              <div className="spec-table" role="table" aria-label="Especificações técnicas">
                {specs.map(([label, value]) => <div className="spec-row" role="row" key={label}><span role="cell">{label}</span><strong role="cell">{value}</strong></div>)}
              </div>
              <aside className="spec-aside">
                <div className="aside-icon"><Ruler size={22} /></div>
                <h3>Feito para o laboratório e para a sala de aula.</h3>
                <p>A estrutura cilíndrica foi pensada para resistir a impactos e pequenas quedas. Na parte frontal, o encaixe permite conduzir objetos esféricos em atividades de robótica futebolista.</p>
                <div className="mini-stats"><span><b>28 mm</b><small>rodas</small></span><span><b>7,4 V</b><small>tensão nominal</small></span><span><b>2S</b><small>configuração</small></span></div>
              </aside>
            </div>
          </div>
        </section>

        <section className="control-section" id="funcionamento">
          <div className="content-width">
            <div className="control-heading"><SectionTitle eyebrow="Como funciona" title="Incline. Envie. Mova." text="O controle remoto traduz a inclinação do operador em comandos direcionais. A comunicação sem fio conecta a experiência física ao raciocínio de programação." /><div className="control-badge"><Gamepad2 size={20} /><span>Controle por gestos</span></div></div>
            <div className="flow-grid">
              {flow.map((item, index) => { const Icon = item.icon; return <div className="flow-item" key={item.title}><span className="flow-number">0{index + 1}</span><Icon size={22} /><h3>{item.title}</h3><p>{item.text}</p>{index < flow.length - 1 && <ChevronRight className="flow-arrow" size={18} />}</div>; })}
            </div>
            <div className="controller-grid">
              <div className="controller-copy"><p className="eyebrow">Controle remoto</p><h3>Gestos que viram comandos.</h3><p>O ESP32-S3 Super Mini interpreta os dados do MPU-6050 — acelerômetro e giroscópio triaxiais — e envia as decisões ao carrinho. Um botão de travamento suspende os comandos sem desligar o sistema.</p><div className="feature-list"><span><Check size={15} /> ESP32-S3 Super Mini</span><span><Check size={15} /> Sensor MPU-6050 via I2C</span><span><Check size={15} /> Botão de segurança lock</span></div></div>
              <div className="python-card"><div className="code-top"><Terminal size={16} /><span>controle.py</span><span className="code-dot" /></div><pre><code><span className="code-purple">robot</span>.<span className="code-blue">set_gain</span>(<span className="code-yellow">1.25</span>){`\n`}<span className="code-purple">robot</span>.<span className="code-blue">move</span>(<span className="code-green">"forward"</span>, <span className="code-yellow">0.8</span>){`\n`}<span className="code-purple">robot</span>.<span className="code-blue">lock</span>()</code></pre><p>O suporte a Python permite ajustar o ganho do sensor e automatizar sequências de movimento.</p></div>
            </div>
          </div>
        </section>

        <section className="sustainability-section">
          <div className="content-width sustainability-grid"><div><p className="eyebrow">Construção responsável</p><h2>Hardware acessível.<br /><span>Impacto ampliado.</span></h2></div><div className="sustainability-copy"><p>A carcaça é produzida por impressão 3D em PLA e TPU. O PLA tem origem vegetal e o TPU oferece flexibilidade para suportes e protetores. O reaproveitamento de células 18650 aproxima o kit de discussões sobre sustentabilidade e economia circular.</p><div className="ods-list"><span>ODS 4 <small>Educação de qualidade</small></span><span>ODS 9 <small>Inovação e infraestrutura</small></span><span>ODS 12 <small>Consumo responsável</small></span></div></div></div>
        </section>

        <section className="plates-section" id="pranchas">
          <div className="content-width"><SectionTitle eyebrow="Desenho técnico" title="As pranchas do protótipo." text="Use as vistas originais para localizar cada parte do carrinho e entender como a estrutura se organiza." /><div className="plates-grid">{plates.map((plate) => <figure className="plate-card" key={plate.code}><div className="plate-image"><span>{plate.code}</span><img src={plate.image} alt={plate.title} loading="lazy" /></div><figcaption><h3>{plate.title}</h3><p>{plate.text}</p></figcaption></figure>)}</div></div>
        </section>

        <section className="closing-section"><div className="content-width closing-content"><div><p className="eyebrow">Próxima etapa</p><h2>Do protótipo<br />à aprendizagem.</h2></div><div><p>Ao final da Fase I, a meta é entregar um protótipo funcional validado em laboratório, com código, esquemas e guia de montagem em formato aberto.</p><a href="#inicio" className="text-link">Voltar ao início <ArrowRight size={16} /></a></div></div></section>
      </main>

      <footer className="site-footer"><span>Carrinho Concept3 · Projeto educacional de robótica</span><span>IFFar · SYSTRONYX · 2026</span></footer>
    </div>
  );
}
