'use client'

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Loader2 } from "lucide-react"
import ReactMarkdown from 'react-markdown'

export default function Home() {
  const [displayedText, setDisplayedText] = useState("")
  const [step, setStep] = useState<
    "system" | "intro" | "input1" | "info" | "input2" | "lore" | "input3" | "conclusion"
  >("system")
  const [input1, setInput1] = useState("")
  const [input2, setInput2] = useState("")
  const [input3, setInput3] = useState("")
  const [infoVisible, setInfoVisible] = useState(false)
  const [loreVisible, setLoreVisible] = useState(false)
  const [conclusionVisible, setConclusionVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Refs for input focus
  const input1Ref = useRef<HTMLInputElement>(null)
  const input2Ref = useRef<HTMLInputElement>(null)
  const input3Ref = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const systemText = `> Iniciando protocolo de segurança S.O.L.A.R.A...
> Verificando integridade do sistema...
> Conexão com servidor central: COMPROMETIDA
> Energia auxiliar: ATIVA
> Sobreviventes na instalação: Informaçõe indisponível
> Acessando banco de dados de emergência...`

  const introText = `> Banco de Dados - Sujeito nº 015
> Carregando registros...
> Nível de acesso: RESTRITO`

  const subjectInfo = {
    nome: "Najimi Kohaku (なじみ 琥珀) ",
    idade: 28,
    genero: "Não Possivel Determinar",
    profissão: "Medico Geral (familiar)",
    nacionalidade: "Japones",
    status: "Em criogenia",
  }

  const loreText = `

**Antecedentes**

*Infância*

Najimi cresceu em um bairro tranquilo de Tóquio, filho único de um professor e uma enfermeira. Teve uma infância feliz, cercada de estudos, amigos e uma curiosidade natural sobre como as coisas funcionavam. Aos 10 anos, sua vida mudou para sempre quando perdeu o pai para uma doença rara e agressiva. Depois do funeral, encontrou os diários do pai, cheios de anotações sobre sua doença e questionamentos sobre o tratamento recebido. Foi ali, entre lágrimas e páginas amareladas, que decidiu se tornar médico – não por fama ou revolução, mas para estar presente quando alguém, como seu pai, mais precisasse.

*Vida antes da queda*

Antes da catástrofe de 1993, Najimi era médico generalista no Hospital Metropolitano de Tóquio. Não era famoso nem revolucionário – apenas dedicado, competente e confiável. Preferia os setores mais agitados, como o pronto-socorro, onde podia ajudar o maior número possível de pessoas. Era conhecido pela calma inabalável mesmo no caos e por sempre arranjar tempo para explicar diagnósticos aos pacientes assustados.

Com 28 anos, Najimi começava a ganhar reconhecimento entre colegas por sua ética e empatia. Não sonhava com cargos administrativos – estava feliz ajudando diretamente quem precisava.

*Família e perdas*

A mãe de Najimi havia partido dois anos antes do Colapso, devido a problemas cardíacos, deixando-o sem família direta. Nunca se casou, tendo apenas relacionamentos passageiros que não floresceram devido à sua dedicação quase total ao hospital. Com o tempo, colegas e pacientes regulares se tornaram sua família escolhida.

*Motivação para continuar*

O que faz Najimi seguir em frente é simples: a necessidade de ajudar. Num mundo onde médicos treinados são raros, suas habilidades nunca foram tão necessárias. Acredita que enquanto houver quem precise de cuidados, tem a obrigação de continuar. Não se vê como herói, apenas como alguém cumprindo seu dever – fazer aquilo para o qual foi treinado.

Há também o conforto das conexões humanas que cria. No caos do mundo pós-apocalíptico, cuidar dos outros forma laços que preenchem, em parte, o vazio deixado pela família perdida. Cada vida salva é uma pequena luz contra a escuridão que ameaça engoli-lo quando pensa em tudo que se perdeu.

*Segredos e passado*

Najimi não esconde grandes mistérios – sua vida antes do colapso foi bastante comum para um médico dedicado. Seu único "segredo" seria o quanto a morte do pai o afetou, incluindo um período de depressão na adolescência que prefere não compartilhar. Essa experiência pessoal com o sofrimento mental lhe deu uma compreensão profunda da fragilidade psicológica que mantém reservada, temendo que isso possa diminuir a confiança dos pacientes.

Um pequeno detalhe que poucos conhecem: Najimi mantém um diário onde anota meticulosamente o nome de cada pessoa que conseguiu salvar desde o colapso – sua forma de lembrar que, mesmo em um mundo destruído, suas ações ainda têm significado.

*Infomações Sintetizadas*

*Morte do Pai:* A os 10 Anos
*Morte da Mãe:* 2 anos antes do colapso
*Irmãos:* Não
*Cidade Natal:* Toquio (Tokyo)

*Infomações Adicionais*
Pos criogenia possovel mudança comportamental.
`


  const conclusionText = `ALERTA DE SEGURANÇA:

Este terminal faz parte do Protocolo S.O.L.A.R.A. 

É bem provavel que caso você esteja lendo isso, a algum projeto de retirar pessoas da criogenia.

Terminal rodando em modo de emergência. Verifique com atenção os dados fornecidos.

Powed by Deepslate Technologies.`

  // Auto-scroll to bottom when content changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [displayedText, infoVisible, loreVisible, conclusionVisible, step])

  // Focus inputs when steps change
  useEffect(() => {
    if (step === "input1" && input1Ref.current) {
      setTimeout(() => input1Ref.current?.focus(), 100)
    } else if (step === "input2" && input2Ref.current) {
      setTimeout(() => input2Ref.current?.focus(), 100)
    } else if (step === "input3" && input3Ref.current) {
      setTimeout(() => input3Ref.current?.focus(), 100)
    }
  }, [step])

  useEffect(() => {
    if (step === "system" || step === "intro") {
      const text = step === "system" ? systemText : introText
      let i = 0
      setIsLoading(true)

      const interval = setInterval(() => {
        setDisplayedText((t) => t + text[i])
        i++
        if (i >= text.length) {
          clearInterval(interval)
          setIsLoading(false)
          setTimeout(() => {
            setDisplayedText((t) => t + "\n")
            setStep(step === "system" ? "intro" : "input1")
          }, 800)
        }
      }, 30)

      return () => clearInterval(interval)
    }
  }, [step, systemText, introText])

  const handleInput1 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = input1.trim().toLowerCase()

    if (value === "y") {
      setInfoVisible(true)
      setDisplayedText((t) => t + `\n> Comando aceito: ${value}\n> Exibindo informações do sujeito...\n`)
      setTimeout(() => setStep("input2"), 1000)
    } else if (value === "n") {
      setDisplayedText(
        (t) => t + `\n> Comando aceito: ${value}\n> Acesso negado. Reinicie o terminal para tentar novamente.`,
      )
    } else {
      setDisplayedText((t) => t + `\n> Comando inválido: ${value}\n> Use 'y' para sim ou 'n' para não.`)
    }

    setInput1("")
  }

  const handleInput2 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = input2.trim().toLowerCase()

    if (value === "y") {
      setLoreVisible(true)
      setDisplayedText((t) => t + `\n> Comando aceito: ${value}\n> Acessando relatório de incidente...\n`)
      setTimeout(() => setStep("input3"), 1000)
    } else if (value === "n") {
      setDisplayedText((t) => t + `\n> Comando aceito: ${value}\n> Arquivo confidencial ignorado.`)
      setTimeout(() => setStep("input3"), 1000)
    } else {
      setDisplayedText((t) => t + `\n> Comando inválido: ${value}\n> Use 'y' para sim ou 'n' para não.`)
    }

    setInput2("")
  }

  const handleInput3 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = input3.trim().toLowerCase()

    if (value === "y") {
      setConclusionVisible(true)
      setDisplayedText((t) => t + `\n> Comando aceito: ${value}\n> Exibindo instruções finais...\n`)
    } else if (value === "n") {
      setDisplayedText((t) => t + `\n> Comando aceito: ${value}\n> Desligando terminal...`)
    } else {
      setDisplayedText((t) => t + `\n> Comando inválido: ${value}\n> Use 'y' para sim ou 'n' para não.`)
    }

    setInput3("")
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-black">
      {/* CRT Top Edge */}
      <div className="w-full h-[20px] bg-[#1a1a1a] border-b-[3px] border-[#111] shadow-[0_5px_15px_rgba(51,255,51,0.4)] relative z-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,rgba(51,255,51,0.1),rgba(51,255,51,0.2),rgba(51,255,51,0.1))]"></div>
        <div className="flex justify-between items-center h-full px-4">
          <div className="w-3 h-3 rounded-full bg-[#ff3333] animate-pulse"></div>
          <div className="text-[10px] text-[#33ff33] font-bold">S.O.L.A.R.A TERMINAL v3.07</div>
          <div className="w-3 h-3 rounded-full bg-[#33ff33] animate-pulse"></div>
        </div>
      </div>

      {/* Terminal Content Container */}
      <div className="flex-1 relative flex flex-col overflow-hidden">
        {/* Terminal Header - Fixed */}
        <div className="sticky top-0 z-30 bg-black bg-opacity-90 backdrop-blur-sm border-b border-[#33ff33] pb-2 pt-2 px-4 md:px-6 flex justify-between">
          <span>TERMINAL://S.O.L.A.R.A/SECURE_ACCESS</span>
          <span className="flex items-center">
            {isLoading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
            {isLoading ? "PROCESSANDO" : "PRONTO"}
          </span>
        </div>

        {/* Scrollable Content Area */}
        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-4 md:p-6 text-[#33ff33] font-mono text-sm md:text-base relative"
        >
          {/* Scanline effect */}
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-20 after:content-[''] after:absolute after:top-0 after:w-full after:h-[2px] after:bg-[rgba(0,255,0,0.2)] after:animate-[scan_4s_linear_infinite]"></div>

          {/* CRT lines effect */}
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10 before:content-[''] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(to_bottom,rgba(0,255,0,0.05),rgba(0,255,0,0.05)_2px,transparent_2px,transparent_4px)]"></div>

          {/* CRT glow effect */}
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-50 z-5 shadow-[inset_0_0_60px_rgba(51,255,51,0.3)]"></div>

          {/* Terminal Content */}
          <div className="relative z-25 min-h-full">
            <div className="whitespace-pre-wrap">{displayedText}</div>

            {step === "input1" && (
              <form onSubmit={handleInput1} className="mt-4 flex items-center">
                <label htmlFor="input1" className="mr-2">
                  {">"} Exibir informações do sujeito? [y/n]:
                </label>
                <input
                  ref={input1Ref}
                  id="input1"
                  type="text"
                  className="bg-transparent border-none outline-none text-[#33ff33] w-24 ml-2 border-b border-[#33ff33] focus:border-[#ffcc00]"
                  value={input1}
                  onChange={(e) => setInput1(e.target.value)}
                  maxLength={1}
                  autoFocus
                />
                <button type="submit" className="sr-only">
                  Enviar
                </button>
              </form>
            )}

            {infoVisible && (
              <div className="mt-4 border border-[#33ff33] p-3 bg-[rgba(0,50,0,0.3)]">
                <p className="text-[#ffcc00] mb-2">{">"} ARQUIVO PESSOAL - CONFIDENCIAL</p>
                <p>
                  {">"} Nome: {subjectInfo.nome}
                </p>
                <p>
                  {">"} Idade: {subjectInfo.idade}
                </p>
                <p>
                  {">"} Gênero: {subjectInfo.genero}
                </p>
                <p>
                  {">"} Função: {subjectInfo.profissão}
                </p>
                <p>
                  {">"} Nacionalidade: {subjectInfo.nacionalidade}
                </p>
                <p className="text-[#ff3333] mt-2">
                  {">"} Status: {subjectInfo.status}
                </p>
              </div>
            )}

            {step === "input2" && (
              <form onSubmit={handleInput2} className="mt-4 flex items-center">
                <label htmlFor="input2" className="mr-2">
                  {">"} Acessar relatório de incidente? [y/n]:
                </label>
                <input
                  ref={input2Ref}
                  id="input2"
                  type="text"
                  className="bg-transparent border-none outline-none text-[#33ff33] w-24 ml-2 border-b border-[#33ff33] focus:border-[#ffcc00]"
                  value={input2}
                  onChange={(e) => setInput2(e.target.value)}
                  maxLength={1}
                  autoFocus
                />
                <button type="submit" className="sr-only">
                  Enviar
                </button>
              </form>
            )}

            {loreVisible && (
              <div className="mt-4 border-l-4 border-[#33ff33] pl-3 bg-[rgba(0,50,0,0.2)]">
                <p className="mb-3 text-[#ffcc00]">{">"} RELATÓRIO DE INCIDENTE - NÍVEL VERMELHO</p>
                <div className="prose prose-sm prose-green max-w-none">
                  <ReactMarkdown>{loreText}</ReactMarkdown>
                </div>
              </div>
            )}

            {step === "input3" && (
              <form onSubmit={handleInput3} className="mt-4 flex items-center">
                <label htmlFor="input3" className="mr-2">
                  {">"} Exibir instruções finais? [y/n]:
                </label>
                <input
                  ref={input3Ref}
                  id="input3"
                  type="text"
                  className="bg-transparent border-none outline-none text-[#33ff33] w-24 ml-2 border-b border-[#33ff33] focus:border-[#ffcc00]"
                  value={input3}
                  onChange={(e) => setInput3(e.target.value)}
                  maxLength={1}
                  autoFocus
                />
                <button type="submit" className="sr-only">
                  Enviar
                </button>
              </form>
            )}

            {conclusionVisible && (
              <div className="mt-4 border border-[#ff3333] p-3 bg-[rgba(50,0,0,0.3)] text-[#ff3333]">
                <p className="mb-2 font-bold">{conclusionText.split("\n\n")[0]}</p>
                <p className="mb-2">{conclusionText.split("\n\n")[1]}</p>
                <p className="mb-2">{conclusionText.split("\n\n")[2]}</p>
                <p className="font-bold">{conclusionText.split("\n\n")[3]}</p>
              </div>
            )}

            {/* Add some bottom padding for better scrolling */}
            <div className="h-20"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
