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
import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function NovaMetaDialog() {
  const [open, setOpen] = useState(false)
  const [faixas, setFaixas] = useState([
    { min: "0", max: "70", categoria: "Não atingida" },
    { min: "70", max: "90", categoria: "Parcial" },
    { min: "90", max: "100", categoria: "Meta" },
    { min: "100", max: "120", categoria: "Superação" },
    { min: "120", max: "", categoria: "Excelência" },
  ])

  const [produtos, setProdutos] = useState([
    { id: 1, descricao: "PF Participativo", selecionado: true },
    { id: 2, descricao: "Migração", selecionado: true },
    { id: 3, descricao: "Opcional", selecionado: false },
    { id: 4, descricao: "PJ Empresarial", selecionado: true },
  ])

  const adicionarFaixa = () => {
    setFaixas([...faixas, { min: "", max: "", categoria: "" }])
  }

  const removerFaixa = (index: number) => {
    setFaixas(faixas.filter((_, i) => i !== index))
  }

  const atualizarFaixa = (index: number, campo: string, valor: string) => {
    setFaixas(faixas.map((faixa, i) => (i === index ? { ...faixa, [campo]: valor } : faixa)))
  }

  const toggleProduto = (id: number) => {
    setProdutos(
      produtos.map((produto) => (produto.id === id ? { ...produto, selecionado: !produto.selecionado } : produto)),
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nova Meta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Nova Meta</DialogTitle>
          <DialogDescription>Configure uma nova meta e suas faixas de comissionamento.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="valorMeta" className="text-right">
              Valor da Meta (R$)
            </Label>
            <Input id="valorMeta" placeholder="Ex: 250000" className="col-span-3" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium">Faixas de Atingimento</Label>
              <Button type="button" variant="outline" size="sm" onClick={adicionarFaixa}>
                <Plus className="h-4 w-4 mr-1" /> Adicionar Faixa
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mínimo (%)</TableHead>
                  <TableHead>Máximo (%)</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faixas.map((faixa, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Input
                        value={faixa.min}
                        onChange={(e) => atualizarFaixa(index, "min", e.target.value)}
                        placeholder="Min %"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={faixa.max}
                        onChange={(e) => atualizarFaixa(index, "max", e.target.value)}
                        placeholder="Max %"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={faixa.categoria}
                        onChange={(e) => atualizarFaixa(index, "categoria", e.target.value)}
                        placeholder="Nome da categoria"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removerFaixa(index)}
                        disabled={faixas.length <= 1}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium">Produtos para Comissionamento</Label>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead className="w-[100px] text-center">Incluir</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {produtos.map((produto) => (
                  <TableRow key={produto.id}>
                    <TableCell>{produto.descricao}</TableCell>
                    <TableCell className="text-center">
                      <input
                        type="checkbox"
                        checked={produto.selecionado}
                        onChange={() => toggleProduto(produto.id)}
                        className="w-4 h-4"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
