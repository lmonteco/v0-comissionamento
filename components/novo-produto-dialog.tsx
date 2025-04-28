"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Plus, X } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function NovoProdutoDialog() {
  const [open, setOpen] = useState(false)
  const [tipos, setTipos] = useState<Array<{ tipo: string; codigos: string[] }>>([])
  const [tipoAtual, setTipoAtual] = useState("")
  const [codigoAtual, setCodigoAtual] = useState("")

  const adicionarCodigo = () => {
    if (!tipoAtual || !codigoAtual) return

    const tipoExistente = tipos.find((t) => t.tipo === tipoAtual)

    if (tipoExistente) {
      if (!tipoExistente.codigos.includes(codigoAtual)) {
        setTipos(tipos.map((t) => (t.tipo === tipoAtual ? { ...t, codigos: [...t.codigos, codigoAtual] } : t)))
      }
    } else {
      setTipos([...tipos, { tipo: tipoAtual, codigos: [codigoAtual] }])
    }

    setCodigoAtual("")
  }

  const removerCodigo = (tipo: string, codigo: string) => {
    setTipos(
      tipos
        .map((t) => (t.tipo === tipo ? { ...t, codigos: t.codigos.filter((c) => c !== codigo) } : t))
        .filter((t) => t.codigos.length > 0),
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Novo Produto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Novo Produto</DialogTitle>
          <DialogDescription>Configure um novo produto para comissionamento.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="descricao" className="text-right">
              Descrição
            </Label>
            <Input id="descricao" placeholder="Ex: PF Participativo" className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Tipos e Códigos</Label>
            <div className="col-span-3 space-y-2">
              <div className="flex gap-2">
                <Select onValueChange={setTipoAtual} value={tipoAtual}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Modalidade">Modalidade</SelectItem>
                    <SelectItem value="Tipo de Plano">Tipo de Plano</SelectItem>
                    <SelectItem value="Módulo de Cobertura">Módulo de Cobertura</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Código" value={codigoAtual} onChange={(e) => setCodigoAtual(e.target.value)} />
                <Button type="button" size="sm" onClick={adicionarCodigo}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {tipos.map((tipo, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <span className="text-sm font-medium">{tipo.tipo}:</span>
                    <div className="flex flex-wrap gap-1">
                      {tipo.codigos.map((codigo, cIndex) => (
                        <Badge key={cIndex} variant="secondary" className="text-xs flex items-center gap-1">
                          {codigo}
                          <button
                            onClick={() => removerCodigo(tipo.tipo, codigo)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contabilizaMeta" className="text-right">
              Contabiliza Meta
            </Label>
            <div className="flex items-center space-x-2">
              <Switch id="contabilizaMeta" defaultChecked />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="comissionado" className="text-right">
              Comissionado
            </Label>
            <div className="flex items-center space-x-2">
              <Switch id="comissionado" defaultChecked />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button type="submit" onClick={() => setOpen(false)}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
