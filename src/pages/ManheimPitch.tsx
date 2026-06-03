import ManheimTabs from '../components/ManheimTabs';
import HeroSection from '../components/manheim/HeroSection';
import PersonalNote from '../components/manheim/PersonalNote';
import PlainEnglish from '../components/manheim/PlainEnglish';
import COPSection from '../components/manheim/COPSection';
import LumeVSection from '../components/manheim/LumeVSection';
import CoxLedgerSection from '../components/manheim/CoxLedgerSection';
import LotOpsProSection from '../components/manheim/LotOpsProSection';
import ArchitectureSection from '../components/manheim/ArchitectureSection';
import LumeLanguageSection from '../components/manheim/LumeLanguageSection';
import VETSection from '../components/manheim/VETSection';
import FractalLedgerSection from '../components/manheim/FractalLedgerSection';
import AppShowcase from '../components/manheim/AppShowcase';
import HardwareSection from '../components/manheim/HardwareSection';
import EnterpriseMeshTeaser from '../components/manheim/EnterpriseMeshTeaser';
import EcosystemCTA from '../components/manheim/EcosystemCTA';
import PlatformRoadmap from '../components/manheim/PlatformRoadmap';
import ImplementationPath from '../components/manheim/ImplementationPath';
import FutureHorizons from '../components/manheim/FutureHorizons';

export default function ManheimPitch() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      <ManheimTabs />
      {/* 1. Narrative / Origin Story */}
      <HeroSection />
      {/* Personal context from Jason */}
      <PersonalNote />
      {/* Plain-English explainer — kills AI/blockchain fears before they start */}
      <PlainEnglish />

      {/* 2. THE PLATFORM (The Daily Operations) */}
      <COPSection />
      <LumeVSection />
      <LotOpsProSection />

      {/* 3. THE FRACTAL LEDGER ARCHITECTURE — top-down: root first, then divisions */}
      <FractalLedgerSection />
      <CoxLedgerSection />
      <VETSection />

      {/* 4. THE ENGINE & DIAGNOSTICS (Lume Core, LumeScan, & Hardware) */}
      <LumeLanguageSection />
      <ArchitectureSection />
      <AppShowcase />
      <HardwareSection />

      {/* 5. DEPLOYMENT & ROADMAP */}
      <ImplementationPath />
      <PlatformRoadmap />

      {/* 6. THE ECOSYSTEM (Foundation & Future) */}
      <EcosystemCTA />
      <EnterpriseMeshTeaser />

      {/* 7. Future R&D — compact footnote, not a feature section */}
      <FutureHorizons />
    </div>
  );
}
