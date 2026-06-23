import NetworkNodeTabs from '../components/NetworkNodeTabs';
import HeroSection from '../components/networknode/HeroSection';
import PersonalNote from '../components/networknode/PersonalNote';
import PlainEnglish from '../components/networknode/PlainEnglish';
import COPSection from '../components/networknode/COPSection';
import LumeVSection from '../components/networknode/LumeVSection';
import FLALedgerSection from '../components/networknode/FLALedgerSection';
import LotOpsProSection from '../components/networknode/LotOpsProSection';
import ArchitectureSection from '../components/networknode/ArchitectureSection';
import LumeLanguageSection from '../components/networknode/LumeLanguageSection';
import VETSection from '../components/networknode/VETSection';
import FractalLedgerSection from '../components/networknode/FractalLedgerSection';
import AppShowcase from '../components/networknode/AppShowcase';
import HardwareSection from '../components/networknode/HardwareSection';
import EnterpriseMeshTeaser from '../components/networknode/EnterpriseMeshTeaser';
import EcosystemCTA from '../components/networknode/EcosystemCTA';
import PlatformRoadmap from '../components/networknode/PlatformRoadmap';
import ImplementationPath from '../components/networknode/ImplementationPath';
import FutureHorizons from '../components/networknode/FutureHorizons';

export default function NetworkNodePitch() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      <NetworkNodeTabs />
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
      <FLALedgerSection />
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
