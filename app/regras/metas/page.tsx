import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { NovaMetaDialog } from "@/components/nova-meta-dialog"

const metas = [
  {
    id: 1,
    valor: "R$ 250.000,00",
    faixas: [
      { min: "0%", max: "70%", categoria: "Não atingida" },
      { min: "70%", max: "90%", categoria: "Parcial" },
      { min: "90%", max: "100%", categoria: "Meta" },
      { min: "100%", max: "120%", categoria: "Superação" },
      { min: "120%", max: null, categoria: "Excelência" },
    ],
    produtos: [
      {
        descricao: "PF Participativo",
        comissao: { "Não atingida": "0%", Parcial: "1%", Meta: "2%", Superação: "3%", Excelência: "4%" },
      },
      {
        descricao: "Migração",
        comissao: { "Não atingida": "0%", Parcial: "0.5%", Meta: "1%", Superação: "1.5%", Excelência: "2%" },
      },
      {
        descricao: "PJ Empresarial",
        comissao: { "Não atingida": "0%", Parcial: "1.5%", Meta: "2.5%", Superação: "3.5%", Excelência: "4.5%" },
      },
    ],
    status: "Ativa",
  },
]

export default function MetasPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Configurar Metas</h1>
        <NovaMetaDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Metas Atuais</CardTitle>
          <CardDescription>Defina as metas da equipe de vendas e as faixas de comissionamento.</CardDescription>
        </CardHeader>
        <CardContent>
          {metas.map((meta) => (
            <div key={meta.id} className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Meta: {meta.valor}</h3>
                  <p className="text-sm text-muted-foreground">
                    Status:{" "}
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                      {meta.status}
                    </Badge>
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Faixas de Atingimento</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mínimo</TableHead>
                      <TableHead>Máximo</TableHead>
                      <TableHead>Categoria</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {meta.faixas.map((faixa, index) => (
                      <TableRow key={index}>
                        <TableCell>{faixa.min}</TableCell>
                        <TableCell>{faixa.max || "Sem limite"}</TableCell>
                        <TableCell>{faixa.categoria}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Comissionamento por Produto</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produto</TableHead>
                      {meta.faixas.map((faixa, index) => (
                        <TableHead key={index}>{faixa.categoria}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {meta.produtos.map((produto, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{produto.descricao}</TableCell>
                        {meta.faixas.map((faixa, fIndex) => (
                          <TableCell key={fIndex}>{produto.comissao[faixa.categoria]}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
