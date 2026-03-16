import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Terminal, Package, Zap, Cloud, FileText, CheckCircle2, AlertTriangle, Lightbulb, Database } from "lucide-react";

const PreCourseGuideTab = () => {
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
        <CardContent className="space-y-4">
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

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="types">
              <AccordionTrigger className="text-sm font-semibold">Types of MGEs</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { name: "Insertion Sequences (IS)", desc: "The simplest MGEs: a transposase gene flanked by inverted repeats. They move within a genome but need a conjugative plasmid or phage for cell-to-cell transfer." },
                    { name: "Transposons", desc: "More complex than IS elements, carrying additional cargo genes (e.g. antibiotic resistance determinants) alongside transposition machinery." },
                    { name: "Integrons", desc: "Genetic platforms that capture and express gene cassettes via site-specific recombination. Class 1 integrons are the most clinically prevalent." },
                    { name: "Plasmids", desc: "Autonomously replicating extrachromosomal elements varying greatly in size and copy number. Conjugative plasmids encode their own transfer machinery; mobilizable plasmids rely on helper elements." },
                    { name: "Prophages", desc: "Genomes of temperate phages during the lysogenic cycle, integrated into the chromosome or maintained as plasmids. Induced by signals like the SOS response." },
                    { name: "Phage-plasmids", desc: "Hybrids that function as temperate phages and are maintained as multi-copy extrachromosomal plasmids. They spread horizontally as virions and vertically as plasmids." },
                    { name: "ICEs", desc: "Integrative and Conjugative Elements: large chromosomally integrated MGEs that can excise, circularize and self-transfer by conjugation. Their size is unconstrained by a capsid." },
                    { name: "IMEs", desc: "Integrative and Mobilizable Elements: similar to ICEs but lacking conjugative apparatus. They exploit the transfer machinery of a helper conjugative element." },
                    { name: "PICIs", desc: "Phage-Inducible Chromosomal Islands: phage parasites that excise, replicate and hijack helper phage capsids for their own packaging and transfer." },
                    { name: "GTAs", desc: "Gene Transfer Agents: phage-like particles that package random pieces of host genomic DNA and transfer it to recipient cells." },
                  ].map((item) => (
                    <div key={item.name} className="p-3 rounded-xl bg-muted/50 border border-border/50">
                      <p className="font-semibold text-sm text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="interactions">
              <AccordionTrigger className="text-sm font-semibold">Interactions Among MGEs</AccordionTrigger>
              <AccordionContent className="space-y-3">
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
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="effects">
              <AccordionTrigger className="text-sm font-semibold">Impact on Host & Ecosystems</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  MGE effects span from individual cells to entire ecosystems:
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "Antimicrobial Resistance", desc: "Transposons and integrons within plasmids are key drivers of multidrug resistance spread." },
                    { label: "Virulence", desc: "Prophages and pathogenicity islands encode toxins, adhesins and secretion systems." },
                    { label: "Phage Susceptibility", desc: "MGE-encoded defence systems alter which phages can infect a cell." },
                    { label: "Nutrient Cycling", desc: "Phage-mediated lysis releases cellular contents, influencing biogeochemical cycles." },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-xl bg-muted/50 border border-border/50">
                      <p className="font-semibold text-xs text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="why">
              <AccordionTrigger className="text-sm font-semibold">Why Study MGEs Computationally?</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Studying MGEs requires comparing hundreds of genomes simultaneously, detecting repetitive and
                  structurally complex sequences, and tracking transfer events across taxa. Modern sequencers
                  generate millions of reads per sample — bioinformatics pipelines transform this raw data into
                  assembled genomes, annotated features, phylogenies, and comparative analyses. Advances in
                  sequencing technologies continue to reveal that the magnitude of MGE content in bacterial genomes
                  is staggering, with many previously uncharacterized genomic regions now recognized as mobile
                  defence islands and other MGE-derived structures.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="p-3 rounded-xl bg-muted/30 border border-border/50 text-xs text-muted-foreground">
            <strong className="text-foreground">Reference:</strong> Lang, Buchan & Burrus (2025). "Interactions and
            evolutionary relationships among bacterial mobile genetic elements." <em>Nature Reviews Microbiology</em>, 23, 423–438.
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
            and run your first MGE discovery analyses — from the command line to the cloud.
          </p>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">By the end of this guide, you will be able to:</p>
            <ul className="space-y-2">
              {[
                "Recognise and work with the key genomics file formats (FASTA, FASTQ, GFF3, BAM, VCF)",
                "Install and manage bioinformatics software with Conda, Mamba, and Pixi",
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

      {/* ── Conda / Mamba ── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Managing Software with Conda & Mamba
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed text-sm">
            Bioinformatics tools have complex, often conflicting dependencies. Package managers solve this by
            creating isolated <em>environments</em> — sandboxes where each tool has exactly the versions it
            needs without interfering with anything else.
          </p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="install-conda">
              <AccordionTrigger className="text-sm font-semibold">Installing Miniconda / Mambaforge</AccordionTrigger>
              <AccordionContent>
                <pre className="text-xs font-mono bg-background/80 text-primary p-4 rounded-lg overflow-x-auto border border-border/30 whitespace-pre-wrap">
{`# Download and install Miniconda
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh

# — OR — install Mambaforge (conda + mamba, recommended)
wget https://github.com/conda-forge/miniforge/releases/latest/download/Mambaforge-Linux-x86_64.sh
bash Mambaforge-Linux-x86_64.sh

# Verify
conda --version`}
                </pre>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="channels">
              <AccordionTrigger className="text-sm font-semibold">Set Channel Priority (do this once)</AccordionTrigger>
              <AccordionContent>
                <pre className="text-xs font-mono bg-background/80 text-primary p-4 rounded-lg overflow-x-auto border border-border/30 whitespace-pre-wrap">
{`conda config --add channels defaults
conda config --add channels bioconda
conda config --add channels conda-forge
conda config --set channel_priority strict`}
                </pre>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="conda-commands">
              <AccordionTrigger className="text-sm font-semibold">Essential Conda Commands</AccordionTrigger>
              <AccordionContent>
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
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="mamba">
              <AccordionTrigger className="text-sm font-semibold">Mamba — Conda but 10× Faster</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Mamba is a drop-in replacement that uses C++ dependency solving, making environment creation dramatically faster.
                </p>
                <pre className="text-xs font-mono bg-background/80 text-primary p-4 rounded-lg overflow-x-auto border border-border/30 whitespace-pre-wrap">
{`# Replace conda with mamba for any install/create command
mamba create -n mge_tools -c bioconda -c conda-forge \\
  prokka isescan mob-suite blast samtools biopython

conda activate mge_tools    # activation still uses conda
prokka --version`}
                </pre>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

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
            Pixi — Project-Based Environment Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed text-sm">
            Pixi is a modern, Rust-written package manager built on the conda ecosystem. Unlike conda/mamba which
            manage environments globally, Pixi ties environments to a <strong className="text-foreground">project directory</strong> and
            auto-tracks everything in a <code className="text-xs bg-muted/50 px-1 rounded font-mono">pixi.toml</code> file.
          </p>

          {/* Comparison grid */}
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { name: "Conda", badge: "Classic", items: ["Global environments", "env.yml (manual export)", "Moderate speed", "No built-in lock file", "Best for: General use, HPC"] },
              { name: "Mamba", badge: "Faster", items: ["Global environments", "env.yml (manual export)", "Very fast (C++)", "No built-in lock file", "Best for: Complex envs, HPC"] },
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

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="pixi-install">
              <AccordionTrigger className="text-sm font-semibold">Installing & Using Pixi</AccordionTrigger>
              <AccordionContent className="space-y-3">
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
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="pixi-workshop">
              <AccordionTrigger className="text-sm font-semibold">Workshop Example</AccordionTrigger>
              <AccordionContent>
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed text-sm">
            Google Colaboratory is a free cloud Jupyter notebook environment with a temporary Linux VM,
            Python, and optional GPU — no local installation required.
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

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="colab-tools">
              <AccordionTrigger className="text-sm font-semibold">Installing Bioinformatics Tools in Colab</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Method 1 — conda/mamba via condacolab</p>
                <pre className="text-xs font-mono bg-background/80 text-primary p-4 rounded-lg overflow-x-auto border border-border/30 whitespace-pre-wrap">
{`!pip install -q condacolab
import condacolab
condacolab.install()  # restarts the runtime

# --- after restart, in a new cell ---
!mamba install -c bioconda -c conda-forge prokka isescan -y`}
                </pre>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Method 2 — apt-get</p>
                <pre className="text-xs font-mono bg-background/80 text-primary p-4 rounded-lg overflow-x-auto border border-border/30 whitespace-pre-wrap">
{`!apt-get update -qq
!apt-get install -y -qq ncbi-blast+ samtools`}
                </pre>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Method 3 — pip</p>
                <pre className="text-xs font-mono bg-background/80 text-primary p-4 rounded-lg overflow-x-auto border border-border/30 whitespace-pre-wrap">
{`!pip install biopython pyrodigal`}
                </pre>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="colab-files">
              <AccordionTrigger className="text-sm font-semibold">Working with Files in Colab</AccordionTrigger>
              <AccordionContent>
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed text-sm">
            Most bioinformatics tools run from the terminal (bash shell). Here is a compact reference for
            the commands you will use every day during the workshop.
          </p>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="nav">
              <AccordionTrigger className="text-sm font-semibold">Navigation & File Management</AccordionTrigger>
              <AccordionContent>
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
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="search">
              <AccordionTrigger className="text-sm font-semibold">Viewing & Searching Files</AccordionTrigger>
              <AccordionContent>
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
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="pipes">
              <AccordionTrigger className="text-sm font-semibold">Pipes, Redirects & For-Loops</AccordionTrigger>
              <AccordionContent>
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>

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
              "Install Miniconda or Mambaforge and set channel priority",
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
    </div>
  );
};

export default PreCourseGuideTab;
