"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export default function DefinirDataPage() {
  const [mesReferencia, setMesReferencia] = useState("")
  const [anoReferencia, setAnoReferencia] = useState("")
  const [dataInicio, setDataInicio] = useState("")
  const [dataFim, setDataFim] = useState("")

  const meses = [
    { valor: "01", nome: "Janeiro" },
    { valor: "02", nome: "Fevereiro" },
    { valor: "03", nome: "Março" },
    { valor: "04", nome: "Abril" },
    { valor: "05", nome: "Maio" },
    { valor: "06", nome: "Junho" },
    { valor: "07", nome: "Julho" },
    { valor: "08", nome: "Agosto" },
    { valor: "09", nome: "Setembro" },
    { valor: "10", nome: "Outubro" },
    { valor: "11", nome: "Novembro" },
    { valor: "12", nome: "Dezembro" },
  ]

  const anos = ["2023", "2024", "2025", "2026"]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Definir Data de Apuração</h1>
      </div>

      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Nova Apuração</CardTitle>
          <CardDescription>Defina o período de referência e as datas de apuração.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mesReferencia">Mês de Referência</Label>
              <Select value={mesReferencia} onValueChange={setMesReferencia}>
                <SelectTrigger id="mesReferencia">
                  <SelectValue placeholder="Selecione o mês" />
                </SelectTrigger>
                <SelectContent>
                  {meses.map((mes) => (
                    <SelectItem key={mes.valor} value={mes.valor}>
                      {mes.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="anoReferencia">Ano de Referência</Label>
              <Select value={anoReferencia} onValueChange={setAnoReferencia}>
                <SelectTrigger id="anoReferencia">
                  <SelectValue placeholder="Selecione o ano" />
                </SelectTrigger>
                <SelectContent>
                  {anos.map((ano) => (
                    <SelectItem key={ano} value={ano}>
                      {ano}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dataInicio">Data de Início</Label>
              <Input id="dataInicio" type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dataFim">Data de Fim</Label>
              <Input id="dataFim" type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Cancelar</Button>
          <Button>Criar Apuração</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
