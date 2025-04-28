import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { NovoProdutoDialog } from "@/components/novo-produto-dialog"

const produtos = [
  {
    id: 1,
    descricao: "PF Participativo",
    tipos: [
      { tipo: "Modalidade", codigos: ["001", "002"] },
      { tipo: "Tipo de Plano", codigos: ["PF"] },
    ],
    contabilizaMeta: true,
    comissionado: true,
  },
  {
    id: 2,
    descricao: "Migração",
    tipos: [
      { tipo: "Modalidade", codigos: ["003"] },
      { tipo: "Tipo de Plano", codigos: ["PF", "PJ"] },
    ],
    contabilizaMeta: true,
    comissionado: true,
  },
  {
    id: 3,
    descricao: "Opcional",
    tipos: [{ tipo: "Módulo de Cobertura", codigos: ["OPC1", "OPC2", "OPC3"] }],
    contabilizaMeta: false,
    comissionado: true,
  },
  {
    id: 4,
    descricao: "PJ Empresarial",
    tipos: [
      { tipo: "Modalidade", codigos: ["004", "005"] },
      { tipo: "Tipo de Plano", codigos: ["PJ"] },
    ],
    contabilizaMeta: true,
    comissionado: true,
  },
]

export default function ProdutosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Configurar Produtos</h1>
        <NovoProdutoDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Produtos</CardTitle>
          <CardDescription>
            Configure os produtos a serem contabilizados no atingimento de meta e no comissionamento.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar produto..." className="pl-8" />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead>Tipos e Códigos</TableHead>
                <TableHead className="text-center">Contabiliza Meta</TableHead>
                <TableHead className="text-center">Comissionado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {produtos.map((produto) => (
                <TableRow key={produto.id}>
                  <TableCell className="font-medium">{produto.descricao}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {produto.tipos.map((tipo, index) => (
                        <div key={index} className="flex flex-wrap gap-1 items-center">
                          <span className="text-sm font-medium">{tipo.tipo}:</span>
                          <div className="flex flex-wrap gap-1">
                            {tipo.codigos.map((codigo, cIndex) => (
                              <Badge key={cIndex} variant="outline" className="text-xs">
                                {codigo}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center">
                      <Switch id={`meta-${produto.id}`} defaultChecked={produto.contabilizaMeta} />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center">
                      <Switch id={`comissao-${produto.id}`} defaultChecked={produto.comissionado} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
