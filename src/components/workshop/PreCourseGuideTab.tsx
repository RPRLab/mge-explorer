import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BookOpen, Terminal, Package, Zap, Cloud, FileText, CheckCircle2, AlertTriangle, Lightbulb, Database, ArrowRightLeft, Microscope, FlaskConical, ExternalLink, ChevronRight } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

/* ── Subsection heading component ── */
const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-3 pt-4 first:pt-0">
    <h4 className="text-sm font-semibold text-foreground border-l-2 border-primary pl-3">{title}</h4>
    {children}
  </div>
);

/* ── Data for interactive MGE type cards ── */
const mgeTypes = [
  { name: "Insertion Sequences (IS)", short: "Simplest MGEs: transposase + inverted repeats.", detail: "Insertion sequences are the simplest autonomous transposable elements, consisting of a transposase gene flanked by inverted repeats. They can duplicate or relocate within a genome but depend on conjugative plasmids or phages for intercellular transfer. Despite their simplicity, IS elements are among the most abundant MGEs in bacterial genomes and play a major role in genome rearrangement and gene regulation. Two copies of the same IS can cooperate to mobilize intervening DNA as a 'composite transposon'.", color: "bg-blue-500/10 border-blue-500/30 hover:border-blue-500/60" },
  { name: "Transposons", short: "Carry cargo genes (e.g. AMR) plus transposition machinery.", detail: "Transposons are more complex than IS elements and carry additional 'cargo' genes alongside their transposition machinery. These cargo genes often encode antibiotic resistance determinants, making transposons key drivers of resistance spread. Composite transposons are flanked by IS elements, while unit transposons (like Tn3-family) use a different mechanism involving cointegrate formation and resolution. Transposons can jump between replicons within a cell, facilitating gene movement between chromosomes, plasmids and phages.", color: "bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/60" },
  { name: "Integrons", short: "Capture and express gene cassettes via site-specific recombination.", detail: "Integrons are genetic platforms that capture, stockpile and express open reading frames embedded in gene cassettes via site-specific recombination mediated by an integrase (IntI). Class 1 integrons are the most clinically prevalent and are frequently associated with multidrug resistance in Gram-negative bacteria. They are often embedded within transposons on conjugative plasmids, creating multi-layered mobile structures. Integrons can carry dozens of cassettes, functioning as a reservoir of adaptive functions.", color: "bg-violet-500/10 border-violet-500/30 hover:border-violet-500/60" },
  { name: "Plasmids", short: "Self-replicating extrachromosomal elements of variable size.", detail: "Plasmids are autonomously replicating extrachromosomal DNA molecules that vary enormously in size (1 kb to >1 Mb) and copy number. Conjugative plasmids encode their own transfer machinery (Type IV secretion system) and can self-transfer between cells. Mobilizable plasmids lack full conjugation genes but carry an oriT and relaxase, exploiting helper plasmids for transfer. Plasmids are the primary vehicles for horizontal spread of antibiotic resistance genes. Bacteria regularly harbour multiple plasmids ('coinfection'), and plasmid-plasmid interactions shape patterns of HGT.", color: "bg-amber-500/10 border-amber-500/30 hover:border-amber-500/60" },
  { name: "Prophages", short: "Temperate phage genomes integrated into the chromosome.", detail: "Prophages are the genomes of temperate bacteriophages during the lysogenic cycle, integrated into the host chromosome or maintained as plasmid-like elements. Found in ~75% of sequenced bacterial genomes, they can be induced by signals like the SOS DNA damage response to enter the lytic cycle. Prophages contribute virulence factors, metabolic genes, and defence systems to their hosts. During induction, they can mediate generalized or specialized transduction, transferring host DNA to new recipients.", color: "bg-red-500/10 border-red-500/30 hover:border-red-500/60" },
  { name: "Phage-plasmids", short: "Hybrids that function as both phages and plasmids.", detail: "Phage-plasmids are hybrid elements that combine features of temperate phages and plasmids. They can infect new cells as virions (horizontal spread) and replicate as multicopy extrachromosomal plasmids (vertical inheritance). Pfeifer et al. (2022) showed that phage-plasmids are common — up to 50% of phages and plasmids in some genera — and represent a diverse, ancient category rather than recent fusions. Their genetic plasticity and propensity to recombine with other MGEs make them potent vehicles for accessory gene spread.", color: "bg-pink-500/10 border-pink-500/30 hover:border-pink-500/60" },
  { name: "ICEs", short: "Large self-transferring elements that integrate into chromosomes.", detail: "Integrative and Conjugative Elements are large (often >50 kb) chromosomally integrated MGEs that can excise, circularize, and self-transfer by conjugation. Unlike plasmids, their size is unconstrained by a phage capsid, allowing them to carry extensive cargo including antibiotic resistance islands, metabolic gene clusters, and defence systems. ICEs in Vibrio cholerae carry anti-phage defences (BREX, restriction-modification) that engage in ongoing evolutionary warfare with lytic phages like ICP1.", color: "bg-cyan-500/10 border-cyan-500/30 hover:border-cyan-500/60" },
  { name: "IMEs", short: "Mobilizable elements that exploit helper conjugative systems.", detail: "Integrative and Mobilizable Elements are similar to ICEs but lack their own conjugative transfer apparatus. They encode an oriT and relaxase but depend on a coresiding conjugative element (plasmid or ICE) for transfer. Some IMEs (e.g. SGI1) strongly impair transfer of their helper while boosting their own propagation — a parasitic strategy. IME relaxases are often phylogenetically distinct from those of conjugative plasmids, possibly to interface with a broader range of helper machineries.", color: "bg-orange-500/10 border-orange-500/30 hover:border-orange-500/60" },
  { name: "PICIs", short: "Phage parasites that hijack helper phage capsids.", detail: "Phage-Inducible Chromosomal Islands are molecular parasites of bacteriophages. Upon helper phage infection, PICIs excise from the chromosome, replicate, and redirect phage capsid assembly to package PICI DNA instead of phage DNA. About 0.6% of marine viral particles (~3.2 × 10²⁶ globally) are estimated to be encapsidated PICIs or other satellites. PICIs can increase transduction rates by protecting gene recipients from phage lysis. They also encode defence systems that target rival phages while sparing their cognate helper.", color: "bg-teal-500/10 border-teal-500/30 hover:border-teal-500/60" },
  { name: "GTAs", short: "Phage-like particles packaging random host DNA.", detail: "Gene Transfer Agents are phage-like particles produced by certain bacteria (notably alphaproteobacteria) that package random fragments of the host genome rather than their own DNA. GTAs share evolutionary connections with prophages but have been domesticated for host benefit. They contribute to gene exchange within populations, potentially facilitating repair of deleterious mutations and spread of beneficial alleles. Their regulation is tied to host quorum sensing and stress responses.", color: "bg-indigo-500/10 border-indigo-500/30 hover:border-indigo-500/60" },
];

/* ── Data for interactive impact cards ── */
const impactCards = [
  { label: "Antimicrobial Resistance", short: "Transposons and integrons within plasmids drive multidrug resistance spread.", detail: "Plasmid-borne transposons and integrons are the primary vehicles for horizontal spread of antibiotic resistance genes across species and environments. Composite TEs like those carrying blaNDM have driven global dissemination of carbapenem resistance. The 'Russian-doll' arrangement of TEs within TEs within plasmids creates multilayered mobility that accelerates resistance gene spread in hospitals, farms and wastewater.", icon: "🧬" },
  { label: "Virulence", short: "Prophages and pathogenicity islands encode toxins and adhesins.", detail: "Many major virulence factors are phage-encoded: cholera toxin (CTXφ), diphtheria toxin, Shiga toxin, and botulinum toxin are all carried by prophages. Pathogenicity islands (genomic islands enriched in virulence genes) can be mobilized by helper elements. A phage within Listeria monocytogenes is transduced during phagocytosis and promotes bacterial survival within the phagosome, showing how MGE-encoded functions can be intimately linked to pathogenesis.", icon: "🦠" },
  { label: "Phage Susceptibility", short: "MGE-encoded defence systems alter which phages can infect a cell.", detail: "Defence systems (restriction-modification, CRISPR-Cas, abortive infection, BREX) are frequently MGE-encoded and shape phage-host dynamics. In Vibrio lentus, almost all differential phage susceptibility patterns across 22 strains could be attributed to 26 variable defence-encoding MGEs. Defence system turnover is rapid, with 'phage defence elements' coming and going as phage pressure fluctuates. Some defences also target plasmids and other MGEs.", icon: "🛡️" },
  { label: "Nutrient Cycling", short: "Phage-mediated lysis releases cellular contents into ecosystems.", detail: "Phage lysis of bacterial cells (the 'viral shunt') releases dissolved organic matter, nitrogen and phosphorus back into marine and soil ecosystems, influencing biogeochemical cycles at a global scale. Auxiliary metabolic genes carried by phages (e.g. photosystem genes in cyanophages) can redirect host metabolism during infection. MGE-mediated transfer of carbohydrate-active enzymes between marine bacteria and human gut microbiota shows how HGT shapes metabolic capabilities across environments.", icon: "🌊" },
];

const PreCourseGuideTab = () => {
  const [selectedMge, setSelectedMge] = useState<typeof mgeTypes[0] | null>(null);
  const [selectedImpact, setSelectedImpact] = useState<typeof impactCards[0] | null>(null);

  return (
    <div className="space-y-8">
      {/* ── SECTION 1: What are MGEs ── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            What Are Mobile Genetic Elements?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            Mobile genetic elements (MGEs) are segments of DNA capable of moving within genomes and among cells.
            They mediate{" "}
            <strong className="text-foreground">horizontal gene transfer</strong>, drive genome plasticity, and
            enable bacteria to acquire traits such as antimicrobial resistance, virulence and new metabolic
            capabilities. Prophages are found in ~75% of complete bacterial genomes, and MGEs can account for ~25%
            of a species' pangenome (e.g. <em>E. coli</em>).
          </p>
          <p className="text-muted-foreground leading-relaxed text-sm">
            MGEs are best understood as a{" "}
            <strong className="text-foreground">spectrum of inter-related elements</strong> that share and exchange
            genes, interact cooperatively or antagonistically within cells, and blur traditional classification
            boundaries.
          </p>

          <SubSection title="Types of MGEs">
            <img
              src={BASE + "images/mge-fig1.png"}
              alt="MGEs and their evolutionary connections"
              className="w-full max-h-[400px] object-contain rounded-xl border border-border/50"
              loading="lazy"
            />
            <p className="text-xs text-muted-foreground italic">
              Overview of MGE types and their evolutionary connections (Lang, Buchan & Burrus 2025).
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ChevronRight className="w-3 h-3" /> Click any card to learn more
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {mgeTypes.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setSelectedMge(item)}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer group ${item.color}`}
                >
                  <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                    {item.name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{item.short}</p>
                </button>
              ))}
            </div>
          </SubSection>

          <SubSection title="Interactions Among MGEs">
            <img
              src={BASE + "images/horne-fig1.jpg"}
              alt="Diversity of interactions in the MGE menagerie"
              className="w-full max-h-[400px] object-contain rounded-xl border border-border/50"
              loading="lazy"
            />
            <p className="text-xs text-muted-foreground italic">
              The MGE interaction menagerie: collaborations and conflicts between different element types (Horne, Orr & Hall 2023).
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              MGEs form complex interaction networks within cells:
            </p>
            <ul className="space-y-2">
              {[
                "Conjugative plasmids often harbour IS elements, transposons and integrons carrying antibiotic resistance genes, creating nested 'Matryoshka doll' arrangements.",
                "Phage-inducible chromosomal islands (PICIs) parasitize helper phages, hijacking their capsid proteins for transfer.",
                "Some IMEs (e.g. SGI1) strongly impair transfer of their helper plasmid while boosting their own propagation.",
                "MGEs carry anti-phage defence systems (restriction-modification, CRISPR-Cas, abortive infection) that shape phage-host dynamics.",
                "The SOS DNA damage response triggers excision and transfer of diverse MGEs including ICEs and prophages.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </SubSection>

          <SubSection title="Impact on Host & Ecosystems">
            <img
              src={BASE + "images/mge-fig2.png"}
              alt="Effects of MGEs on host cell phenotypes"
              className="w-full max-h-[400px] object-contain rounded-xl border border-border/50"
              loading="lazy"
            />
            <p className="text-xs text-muted-foreground italic">
              MGE effects on host phenotypes including resistance, virulence and biofilm formation (Lang, Buchan & Burrus 2025).
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ChevronRight className="w-3 h-3" /> Click any card for details and examples
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {impactCards.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setSelectedImpact(item)}
                  className="p-3 rounded-xl bg-muted/50 border border-border/50 hover:border-primary/50 text-left transition-all duration-200 cursor-pointer group"
                >
                  <p className="font-semibold text-xs text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                    <span>{item.icon}</span>
                    {item.label}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{item.short}</p>
                </button>
              ))}
            </div>
          </SubSection>

          <SubSection title="Why Study MGEs Computationally?">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Studying MGEs requires comparing hundreds of genomes simultaneously, detecting repetitive and
              structurally complex sequences, and tracking transfer events across taxa. Modern sequencers
              generate millions of reads per sample. Bioinformatics pipelines transform this raw data into
              assembled genomes, annotated features, phylogenies, and comparative analyses. Recent sequencing
              advances keep revealing new MGE content in bacterial genomes, with many previously uncharacterized
              regions now recognized as mobile defence islands and other MGE-derived structures.
            </p>
          </SubSection>
        </CardContent>
      </Card>

      {/* ── SECTION 1b: HGT Mechanisms & Adaptive Evolution ── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-primary" />
            Horizontal Gene Transfer & Adaptive Evolution
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            Horizontal gene transfer (HGT) is one of the most distinctive features of bacterial evolution.
            Evidence for HGT is found in most bacterial genomes, though many transfer events may be
            evolutionarily neutral. When adaptive transfers occur, HGT combined with positive selection
            produces specific, detectable signatures in genomes.
          </p>

          <SubSection title="Mechanisms of DNA Transfer">
            <img
              src={BASE + "images/arnold-fig1.jpg"}
              alt="Overview of HGT mechanisms: transformation, transduction, conjugation and non-canonical routes"
              className="w-full max-h-[400px] object-contain rounded-xl border border-border/50"
              loading="lazy"
            />
            <p className="text-xs text-muted-foreground italic">
              Mechanisms of DNA uptake and integration: classic routes and non-canonical mechanisms (Arnold, Huang & Hanage 2022).
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { name: "Transformation", desc: "Uptake of free DNA from the environment. Can be constitutive or induced by DNA damage/starvation, and may preferentially target same-species DNA.", color: "bg-blue-500/10 border-blue-500/30" },
                { name: "Transduction", desc: "Phage-mediated transfer of DNA. As diverse as the phages that enable it, ranging from generalized to specialized to lateral transduction.", color: "bg-red-500/10 border-red-500/30" },
                { name: "Conjugation", desc: "Direct cell-to-cell transfer via conjugative pili, used by plasmids and ICEs. Enables transfer of very large DNA segments.", color: "bg-emerald-500/10 border-emerald-500/30" },
                { name: "Non-canonical", desc: "Transfer via membrane vesicles, nanotubes, or gene transfer agents (GTAs). Their contribution to overall HGT is still being quantified.", color: "bg-violet-500/10 border-violet-500/30" },
              ].map((item) => (
                <div key={item.name} className={`p-3 rounded-xl border ${item.color}`}>
                  <p className="font-semibold text-sm text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </SubSection>

          <SubSection title="Genomic Signatures of HGT">
            <img
              src={BASE + "images/arnold-fig2.jpg"}
              alt="Impacts of allele transfer and gene transfer on genomic variation"
              className="w-full max-h-[400px] object-contain rounded-xl border border-border/50"
              loading="lazy"
            />
            <p className="text-xs text-muted-foreground italic">
              Allele transfer vs. gene transfer and their impacts on genomic variation (Arnold, Huang & Hanage 2022).
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Two distinct types of recombination leave different genomic footprints:
            </p>
            <ul className="space-y-2">
              {[
                "Allele transfer (AT): replaces one allele with another from the same or a different population. Breaks or creates linkage depending on donor relatedness.",
                "Gene transfer (GT): alters the gene content of the genome. Genomic islands are commonly transferred via transduction or conjugation, leaving behind mobilization-associated genes.",
                "Gene-specific sweeps occur when recombination unlinks a beneficial allele from the rest of the genome, allowing selection to act on individual loci.",
                "Detecting HGT relies on atypical G+C content, codon usage, k-mer signatures, or phylogenetic incongruence between gene trees and species trees.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </SubSection>

          <SubSection title="HGT & Natural Selection">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Selection and HGT interact to create distinctive signatures in bacterial genomes:
            </p>
            <ul className="space-y-2">
              {[
                "Many transfer events are evolutionarily neutral, representing an incessant process that only occasionally produces beneficial outcomes.",
                "When adaptive transfers occur, gene-specific sweeps can be observed across marine, soil and pathogenic species.",
                "Negative frequency-dependent selection (NFDS) and adaptation to multiple ecological niches both promote gene-specific sweeps by maintaining genetic diversity at other loci.",
                "The accessory genome (pangenome) reflects a balance between rapid gene acquisition, short-term persistence and selective elimination of costly genes.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </SubSection>
        </CardContent>
      </Card>

      {/* ── SECTION 1c: MGE-MGE Interactions ── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-primary" />
            MGE-MGE Interactions & Their Effects on HGT
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            MGEs are agents with their own evolutionary interests. Their interactions with each
            other can both promote and inhibit the acquisition of new genetic material, shaping
            the flow of adaptive traits through microbial communities.
          </p>

          <SubSection title="Collaborations Between MGEs">
            <img
              src={BASE + "images/mge-fig3.png"}
              alt="Shared gene modules across MGE types showing evolutionary connections"
              className="w-full max-h-[400px] object-contain rounded-xl border border-border/50"
              loading="lazy"
            />
            <p className="text-xs text-muted-foreground italic">
              Shared and exchanged gene modules across MGE types, illustrating collaborative evolutionary connections (Lang, Buchan & Burrus 2025).
            </p>
            <ul className="space-y-2">
              {[
                "Transposable elements form nested structures within plasmids, creating 'Russian-doll' mobility that drives global dissemination of resistance genes like blaNDM.",
                "Multicopy plasmids amplify gene dosage for transposon-encoded resistance genes, offering enhanced protection and selective advantages for TEs.",
                "Mobilizable plasmids lack conjugation genes but exploit helper plasmids for transfer. Their relaxases often evolve to interface with diverse conjugative machineries.",
                "Phage-plasmids are common, sometimes comprising up to 50% of phages and plasmids in some genera, and are ancient rather than recent fusions.",
                "Lateral transduction by integrative phages can transfer adjacent host DNA at orders of magnitude higher efficiency than canonical HGT mechanisms.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </SubSection>

          <SubSection title="Conflicts & Defence Systems">
            <img
              src={BASE + "images/mge-fig4.png"}
              alt="Mobilization strategies used by IMEs to exploit conjugative helper elements"
              className="w-full max-h-[400px] object-contain rounded-xl border border-border/50"
              loading="lazy"
            />
            <p className="text-xs text-muted-foreground italic">
              Mobilization strategies used by IMEs to exploit and conflict with conjugative helper elements (Lang, Buchan & Burrus 2025).
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              New MGEs can pose risks: phages lyse cells, plasmids impose costs, and transposons disrupt genes.
              Defence systems that restrict gene acquisition reshape patterns of HGT:
            </p>
            <ul className="space-y-2">
              {[
                "Defence systems are being discovered at a rapid rate, with diverse molecular functions. Many are encoded on MGEs themselves and serve the element's interests.",
                "PICIs parasitize helper phages, hijacking capsids for their own transfer. This can increase phage-mediated transduction by protecting recipients from lysis.",
                "In Vibrio cholerae, phage ICP1 and chromosomal islands (PLE, ICEs) engage in ongoing warfare: CRISPR-Cas, restriction-modification, and counter-defence systems trade dominance across seasons.",
                "Multidrug resistance plasmids carry 'defence islands' with multiple cooperating anti-phage systems (e.g. BREX + type-IV restriction).",
                "Anti-plasmid systems like Wadjet discriminate targets based on size and circularity rather than sequence, extruding and cleaving small circular plasmids.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </SubSection>

          <SubSection title="A Tangled Web">
            <p className="text-sm text-muted-foreground leading-relaxed">
              MGE interactions cannot be easily pigeonholed into conflict or collaboration.
              Entities may collaborate to suppress others, while antagonism at one level drives
              cooperation at another. PICIs are classic 'hyperparasites' (parasites of parasites),
              creating dynamics that are dependent on, and conflicting with, their hosts
              and the hosts of their hosts. Surface modifications like capsule switching
              wire bacteria into different networks of phage-mediated gene exchange,
              linking MGE interactions to the physical properties of the cell.
            </p>
          </SubSection>
        </CardContent>
      </Card>

      {/* ── SECTION 1d: Studying HGT in Microbial Communities ── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Microscope className="w-5 h-5 text-primary" />
            Studying HGT in Microbial Communities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            A suite of computational algorithms and experimental approaches now enables us to study
            the genes being transferred and the ecology of HGT in natural microbial communities
            such as the human gut, soil and marine environments.
          </p>

          <SubSection title="Methods for Detecting MGEs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-3 font-semibold text-foreground">Goal</th>
                    <th className="text-left py-2 pr-3 font-semibold text-foreground">Method</th>
                    <th className="text-left py-2 font-semibold text-foreground">Trade-off</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    { goal: "Identify MGEs", method: "Gene markers in metagenomes", tradeoff: "High confidence but dependent on reference databases" },
                    { goal: "Identify MGEs", method: "k-mer partitioning / binning", tradeoff: "De novo, but lower sensitivity" },
                    { goal: "Genomic context", method: "Long-read sequencing", tradeoff: "Full-length elements, but higher cost and error" },
                    { goal: "Genomic context", method: "Methylation signatures", tradeoff: "High accuracy, but limited resolution" },
                    { goal: "Link MGE to host", method: "Proximity ligation (Hi-C)", tradeoff: "Comprehensive, but expensive and low sensitivity" },
                    { goal: "Link MGE to host", method: "Single-cell fusion PCR", tradeoff: "High sensitivity, but low throughput" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border/30">
                      <td className="py-2 pr-3">{row.goal}</td>
                      <td className="py-2 pr-3">{row.method}</td>
                      <td className="py-2">{row.tradeoff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SubSection>

          <SubSection title="Metagenomic Challenges">
            <img
              src={BASE + "images/brito-fig2.jpg"}
              alt="Metagenomic assessment of the mobilome: assembly challenges"
              className="w-full max-h-[400px] object-contain rounded-xl border border-border/50"
              loading="lazy"
            />
            <p className="text-xs text-muted-foreground italic">
              Challenges in metagenomic assessment of the mobilome (Brito 2021).
            </p>
            <ul className="space-y-2">
              {[
                "Short-read sequencing (100-300 bp) struggles with repetitive and structurally complex MGE regions, producing fragmented assemblies.",
                "MGEs often have variable sequencing depth compared to host genomes due to free-floating phages, high-copy plasmids, and shared mobile genes across elements.",
                "Mobile contigs are often left unbinned or incorporated into only a subset of their host genomes during metagenomic binning.",
                "Reference databases of MGEs are notoriously incomplete and biased towards well-studied pathogenic organisms.",
                "Long-read sequencing (PacBio, Nanopore) can span entire transposon insertions, prophages, and even full plasmids, but cannot link non-integrative plasmids to hosts.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </SubSection>

          <SubSection title="HGT Dynamics in Communities">
            <img
              src={BASE + "images/brito-fig1.jpg"}
              alt="General routes of horizontal gene transfer within natural microbial communities"
              className="w-full max-h-[400px] object-contain rounded-xl border border-border/50"
              loading="lazy"
            />
            <p className="text-xs text-muted-foreground italic">
              Routes of horizontal gene transfer in natural microbial communities (Brito 2021).
            </p>
            <ul className="space-y-2">
              {[
                "In the human gut, shared genes between distantly related species reveal HGT networks shaped by co-habitat more than taxonomy.",
                "Antibiotic resistance genes in the gut resistome are shared between commensals and pathogens, with plasmids and phages serving as primary exchange vehicles.",
                "Soil and marine environments harbour enormous MGE diversity; ocean viromes alone are estimated to contain >10⁷ unique viral types.",
                "Community-level HGT studies increasingly integrate metagenomics, metatranscriptomics and proximity ligation to build comprehensive transfer maps.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </SubSection>
        </CardContent>
      </Card>

      {/* ── References ── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Key References
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { authors: "Lang, Buchan & Burrus", year: 2025, title: "Mobile genetic elements in bacteria", journal: "Nat Rev Microbiol", volume: "Early access", url: "https://doi.org/10.1038/s41579-025-01148-z" },
              { authors: "Arnold, Huang & Hanage", year: 2022, title: "Horizontal gene transfer and adaptive evolution in bacteria", journal: "Nat Rev Microbiol", volume: "20, 206–218", url: "https://doi.org/10.1038/s41579-021-00650-4" },
              { authors: "Horne, Orr & Hall", year: 2023, title: "How do interactions between mobile genetic elements affect HGT?", journal: "Curr Opin Microbiol", volume: "73, 102282", url: "https://doi.org/10.1016/j.mib.2023.102282" },
              { authors: "Brito", year: 2021, title: "Examining horizontal gene transfer in microbial communities", journal: "Nat Rev Microbiol", volume: "19, 442–453", url: "https://doi.org/10.1038/s41579-021-00534-7" },
            ].map((ref) => (
              <a
                key={ref.url}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/40 transition-colors group"
              >
                <p className="text-sm text-foreground font-medium group-hover:text-primary transition-colors">
                  {ref.authors} ({ref.year})
                  <ExternalLink className="w-3 h-3 inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{ref.title}</p>
                <p className="text-xs text-muted-foreground/70 mt-0.5 italic">{ref.journal}, {ref.volume}</p>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── SECTION 2: Bioinformatics Basics ── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Bioinformatics Basics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Everything you need to set up your environment, understand key file formats,
            and run your first MGE discovery analyses, from the command line to the cloud.
          </p>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">By the end of this guide, you will be able to:</p>
            <ul className="space-y-2">
              {[
                "Recognise and work with the key genomics file formats (FASTA, FASTQ, GFF3, BAM, VCF)",
                "Install and manage bioinformatics software with Conda and Pixi",
                "Set up and run analyses in Google Colab",
                "Navigate the Linux command line and process files efficiently",
              ].map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* ── File Formats ── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Key Genomics File Formats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { tag: "FASTA", ext: ".fna / .faa / .fa", desc: "Stores nucleotide or protein sequences. Header line starts with >, followed by the sequence.", code: ">contig_1 length=4215\nATGCATGCATGC..." },
              { tag: "FASTQ", ext: ".fastq / .fq.gz", desc: "Like FASTA but adds per-base Phred quality scores encoded as ASCII. Each record spans exactly 4 lines.", code: "@read_id\nATGCATGC\n+\nIIIIFHHH" },
              { tag: "GFF3", ext: ".gff / .gff3", desc: "Tab-separated annotation file. Stores feature coordinates (genes, CDS, IS elements). 1-based, inclusive coordinates.", code: "contig_1  Prokka  CDS  120  890  .  +  0\n  ID=gene1;product=transposase" },
              { tag: "SAM/BAM", ext: ".sam / .bam", desc: "Stores read alignments to a reference. SAM is text; BAM is its binary equivalent. Requires samtools.", code: "samtools sort aln.sam -o aln.bam\nsamtools index aln.bam" },
            ].map((fmt) => (
              <div key={fmt.tag} className="rounded-xl border border-border/50 overflow-hidden">
                <div className="px-4 py-2 bg-muted/80 flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-primary">{fmt.tag}</span>
                  <span className="text-xs text-muted-foreground">{fmt.ext}</span>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-sm text-muted-foreground">{fmt.desc}</p>
                  <pre className="text-xs font-mono bg-background/80 text-primary p-3 rounded-lg overflow-x-auto border border-border/30">{fmt.code}</pre>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-accent/10 border border-accent/20 text-sm">
            <Lightbulb className="w-4 h-4 text-accent-foreground mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">
              <strong className="text-foreground">Tip:</strong> GFF3 uses 1-based inclusive coordinates; BED format uses 0-based half-open coordinates. Never mix them without converting first.
            </span>
          </div>

          {/* Data flow table */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-foreground mb-3">Data Flow: From Reads to MGE Annotation</p>
            <div className="overflow-x-auto rounded-xl border border-border/50">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left px-4 py-2 font-semibold text-foreground">Stage</th>
                    <th className="text-left px-4 py-2 font-semibold text-foreground">Biological meaning</th>
                    <th className="text-left px-4 py-2 font-semibold text-foreground">Format</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    ["Raw sequencing", "Instrument output with quality scores", "FASTQ"],
                    ["Reference genome", "Assembled chromosomal sequences", "FASTA (.fna)"],
                    ["Read mapping", "Reads aligned to reference", "SAM / BAM"],
                    ["Annotation", "Gene and MGE feature coordinates", "GFF3 / GTF / BED"],
                    ["Variants", "SNPs, indels, insertion sites", "VCF / BCF"],
                    ["Proteins", "Translated open reading frames", "FASTA (.faa)"],
                  ].map(([stage, meaning, format]) => (
                    <tr key={stage} className="border-t border-border/30">
                      <td className="px-4 py-2">{stage}</td>
                      <td className="px-4 py-2">{meaning}</td>
                      <td className="px-4 py-2"><code className="text-xs bg-muted/50 px-2 py-0.5 rounded font-mono text-primary">{format}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Conda ── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Managing Software with Conda
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed text-sm">
            Bioinformatics tools have complex, often conflicting dependencies. Package managers solve this by
            creating isolated <em>environments</em>, sandboxes where each tool has exactly the versions it
            needs without interfering with anything else.
          </p>

          <SubSection title="Installing Miniconda">
            <pre className="text-xs font-mono bg-background/80 text-primary p-4 rounded-lg overflow-x-auto border border-border/30 whitespace-pre-wrap">
{`# Download and install Miniconda
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh

# Verify
conda --version`}
            </pre>
          </SubSection>

          <SubSection title="Set Channel Priority (do this once)">
            <pre className="text-xs font-mono bg-background/80 text-primary p-4 rounded-lg overflow-x-auto border border-border/30 whitespace-pre-wrap">
{`conda config --add channels defaults
conda config --add channels bioconda
conda config --add channels conda-forge
conda config --set channel_priority strict`}
            </pre>
          </SubSection>

          <SubSection title="Essential Conda Commands">
            <div className="overflow-x-auto rounded-xl border border-border/50">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left px-4 py-2 font-semibold text-foreground">Command</th>
                    <th className="text-left px-4 py-2 font-semibold text-foreground">What it does</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    ["conda create -n myenv python=3.11", "Create a new environment"],
                    ["conda activate myenv", "Switch into an environment"],
                    ["conda deactivate", "Leave the current environment"],
                    ["conda install -c bioconda samtools", "Install a package from Bioconda"],
                    ["conda env export > env.yml", "Save environment as reproducible YAML"],
                    ["conda env create -f env.yml", "Recreate environment from YAML"],
                    ["conda env list", "List all environments on the system"],
                    ["conda remove -n myenv --all", "Delete an environment"],
                  ].map(([cmd, desc]) => (
                    <tr key={cmd} className="border-t border-border/30">
                      <td className="px-4 py-2"><code className="text-xs font-mono text-primary">{cmd}</code></td>
                      <td className="px-4 py-2">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SubSection>


          <div className="flex items-start gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-sm">
            <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">
              <strong className="text-foreground">Never install tools into your base environment.</strong> Always create a dedicated environment per project to avoid dependency conflicts.
            </span>
          </div>
        </CardContent>
      </Card>

      {/* ── Pixi ── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Pixi: Project-Based Environment Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed text-sm">
            Pixi is a modern, Rust-written package manager built on the conda ecosystem. Unlike conda which
            manage environments globally, Pixi ties environments to a <strong className="text-foreground">project directory</strong> and
            auto-tracks everything in a <code className="text-xs bg-muted/50 px-1 rounded font-mono">pixi.toml</code> file.
          </p>

          {/* Comparison grid */}
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { name: "Conda", badge: "Classic", items: ["Global environments", "env.yml (manual export)", "Moderate speed", "No built-in lock file", "Best for: General use, HPC"] },
              { name: "Pixi", badge: "Modern", items: ["Per-project (.pixi/)", "pixi.toml (auto-tracked)", "Very fast (Rust)", "pixi.lock (automatic)", "Best for: New projects, sharing"] },
            ].map((tool) => (
              <div key={tool.name} className="p-4 rounded-xl bg-muted/30 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-sm text-foreground">{tool.name}</span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-primary text-primary-foreground">{tool.badge}</span>
                </div>
                <ul className="space-y-1">
                  {tool.items.map((item) => (
                    <li key={item} className="text-xs text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <SubSection title="Installing & Using Pixi">
            <pre className="text-xs font-mono bg-background/80 text-primary p-4 rounded-lg overflow-x-auto border border-border/30 whitespace-pre-wrap">
{`# Install Pixi
curl -fsSL https://pixi.sh/install.sh | bash
pixi --version`}
            </pre>
            <div className="overflow-x-auto rounded-xl border border-border/50">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left px-4 py-2 font-semibold text-foreground">Command</th>
                    <th className="text-left px-4 py-2 font-semibold text-foreground">What it does</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    ["pixi init my_project", "Initialise a new project with pixi.toml"],
                    ["pixi add -c bioconda prokka", "Add a package to the project"],
                    ["pixi install", "Install all dependencies from pixi.toml"],
                    ["pixi shell", "Open a shell with the environment active"],
                    ["pixi run prokka --help", "Run a command inside the environment"],
                    ["pixi list", "List installed packages"],
                  ].map(([cmd, desc]) => (
                    <tr key={cmd} className="border-t border-border/30">
                      <td className="px-4 py-2"><code className="text-xs font-mono text-primary">{cmd}</code></td>
                      <td className="px-4 py-2">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SubSection>

          <SubSection title="Workshop Example">
            <pre className="text-xs font-mono bg-background/80 text-primary p-4 rounded-lg overflow-x-auto border border-border/30 whitespace-pre-wrap">
{`pixi init mge_workshop
cd mge_workshop
pixi add -c bioconda -c conda-forge prokka isescan mob-suite blast samtools
pixi shell
# You're now inside the environment
prokka --version`}
            </pre>
            <div className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-accent/10 border border-accent/20 text-sm">
              <Lightbulb className="w-4 h-4 text-accent-foreground mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">
                <strong className="text-foreground">Sharing:</strong> Commit <code className="text-xs font-mono">pixi.toml</code> and <code className="text-xs font-mono">pixi.lock</code> to git. Anyone who clones your repo and runs <code className="text-xs font-mono">pixi install</code> gets the exact same environment.
              </span>
            </div>
          </SubSection>
        </CardContent>
      </Card>

      {/* ── Google Colab ── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-primary" />
            Running Analyses in Google Colab
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed text-sm">
            Google Colaboratory is a free cloud Jupyter notebook environment with a temporary Linux VM,
            Python, and optional GPU. No local installation required.
          </p>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">Getting Started</p>
            <ol className="space-y-2">
              {[
                "Go to colab.research.google.com and sign in with your Google account",
                "Click File → New notebook or open a notebook shared by the instructor",
                "Mount Google Drive immediately so your data persists between sessions",
                "Run the setup cell to install all required tools",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex items-start gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-sm">
            <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">
              <strong className="text-foreground">Sessions are temporary.</strong> Colab resets after ~90 minutes of inactivity. Always save outputs to Google Drive or download them.
            </span>
          </div>

          <SubSection title="Installing Bioinformatics Tools in Colab">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Method 1: conda via condacolab</p>
            <pre className="text-xs font-mono bg-background/80 text-primary p-4 rounded-lg overflow-x-auto border border-border/30 whitespace-pre-wrap">
{`!pip install -q condacolab
import condacolab
condacolab.install()  # restarts the runtime

# --- after restart, in a new cell ---
!conda install -c bioconda -c conda-forge prokka isescan -y`}
            </pre>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Method 2: apt-get</p>
            <pre className="text-xs font-mono bg-background/80 text-primary p-4 rounded-lg overflow-x-auto border border-border/30 whitespace-pre-wrap">
{`!apt-get update -qq
!apt-get install -y -qq ncbi-blast+ samtools`}
            </pre>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Method 3: pip</p>
            <pre className="text-xs font-mono bg-background/80 text-primary p-4 rounded-lg overflow-x-auto border border-border/30 whitespace-pre-wrap">
{`!pip install biopython pyrodigal`}
            </pre>
          </SubSection>

          <SubSection title="Working with Files in Colab">
            <pre className="text-xs font-mono bg-background/80 text-primary p-4 rounded-lg overflow-x-auto border border-border/30 whitespace-pre-wrap">
{`# Mount Google Drive (recommended)
from google.colab import drive
drive.mount('/content/drive')

# Upload from your computer
from google.colab import files
uploaded = files.upload()

# Download a result file
files.download('prokka_results/genome.gff')`}
            </pre>
          </SubSection>
        </CardContent>
      </Card>

      {/* ── Command Line ── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-primary" />
            Command-Line Essentials
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed text-sm">
            Most bioinformatics tools run from the terminal (bash shell). Here is a compact reference for
            the commands you will use every day during the workshop.
          </p>

          <SubSection title="Navigation & File Management">
            <div className="overflow-x-auto rounded-xl border border-border/50">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left px-4 py-2 font-semibold text-foreground">Command</th>
                    <th className="text-left px-4 py-2 font-semibold text-foreground">What it does</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    ["pwd", "Print current working directory"],
                    ["ls -lh", "List files with human-readable sizes"],
                    ["cd /path/to/dir", "Change directory"],
                    ["mkdir -p results/prokka", "Create nested directories"],
                    ["cp file.fna backup/", "Copy a file"],
                    ["mv old.fna new.fna", "Rename / move a file"],
                    ["rm -i file.fna", "Delete a file (asks confirmation)"],
                  ].map(([cmd, desc]) => (
                    <tr key={cmd} className="border-t border-border/30">
                      <td className="px-4 py-2"><code className="text-xs font-mono text-primary">{cmd}</code></td>
                      <td className="px-4 py-2">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SubSection>

          <SubSection title="Viewing & Searching Files">
            <div className="overflow-x-auto rounded-xl border border-border/50">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left px-4 py-2 font-semibold text-foreground">Command</th>
                    <th className="text-left px-4 py-2 font-semibold text-foreground">What it does</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    ["less file.fna", "Scroll through a file (q to quit)"],
                    ["head -20 file.fna", "Show first 20 lines"],
                    ["wc -l file.fna", "Count lines in file"],
                    ["grep '>' file.fna", "Find header lines in FASTA"],
                    ["grep -c '>' file.fna", "Count FASTA sequences"],
                    ["zcat file.fq.gz | head", "View gzipped FASTQ without decompressing"],
                  ].map(([cmd, desc]) => (
                    <tr key={cmd} className="border-t border-border/30">
                      <td className="px-4 py-2"><code className="text-xs font-mono text-primary">{cmd}</code></td>
                      <td className="px-4 py-2">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SubSection>

          <SubSection title="Pipes, Redirects & For-Loops">
            <pre className="text-xs font-mono bg-background/80 text-primary p-4 rounded-lg overflow-x-auto border border-border/30 whitespace-pre-wrap">
{`# Redirect output to a file
grep 'transposase' annotation.gff > transposase_hits.txt

# Pipe into another command
grep 'transposase' annotation.gff | wc -l

# Count unique contig names
cut -f1 annotation.gff | sort -u | wc -l

# Batch processing with a for-loop
for genome in genomes/*.fna; do
  sample=$(basename $genome .fna)
  prokka $genome --outdir results/$sample --prefix $sample
done`}
            </pre>
          </SubSection>

          <div className="flex items-start gap-2 p-3 rounded-xl bg-accent/10 border border-accent/20 text-sm">
            <Lightbulb className="w-4 h-4 text-accent-foreground mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">
              <strong className="text-foreground">Tab completion is your friend.</strong> Press Tab in the terminal to auto-complete file names and commands.
            </span>
          </div>
        </CardContent>
      </Card>

      {/* ── Quick Reference ── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            Setup Checklist & Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2">
            {[
              "Install Miniconda and set channel priority",
              "Create a dedicated conda environment per project (never use base)",
              "Export env.yml before sharing or archiving your work",
              "For new projects, consider Pixi for automatic lock files",
              "In Colab: mount Google Drive + install tools in every new session",
              "Always download or save results before closing a Colab tab",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <p className="text-sm font-semibold text-foreground mb-3">Useful Databases & Resources</p>
            <div className="overflow-x-auto rounded-xl border border-border/50">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left px-4 py-2 font-semibold text-foreground">Resource</th>
                    <th className="text-left px-4 py-2 font-semibold text-foreground">What it provides</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    ["Bioconda", "Bioinformatics package channel"],
                    ["Pixi docs", "Official Pixi documentation"],
                    ["ISfinder", "Insertion sequence database"],
                    ["PLSDB", "Plasmid database"],
                    ["NCBI BLAST", "Sequence similarity search"],
                    ["Prokka", "Rapid prokaryotic annotation"],
                    ["ISEScan", "IS element prediction"],
                    ["MOB-suite", "Plasmid characterisation"],
                  ].map(([name, desc]) => (
                    <tr key={name} className="border-t border-border/30">
                      <td className="px-4 py-2 font-medium text-foreground">{name}</td>
                      <td className="px-4 py-2">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Dialogs ── */}
      <Dialog open={!!selectedMge} onOpenChange={() => setSelectedMge(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedMge?.name}</DialogTitle>
            <DialogDescription className="sr-only">Details about {selectedMge?.name}</DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground leading-relaxed">{selectedMge?.detail}</p>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedImpact} onOpenChange={() => setSelectedImpact(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-xl">{selectedImpact?.icon}</span>
              {selectedImpact?.label}
            </DialogTitle>
            <DialogDescription className="sr-only">Details about {selectedImpact?.label}</DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground leading-relaxed">{selectedImpact?.detail}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PreCourseGuideTab;
