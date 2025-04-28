import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const premiacoes = [
  {
    id: 1,
    valor: "R$ 5.000,00",
    percentualMinimo: "95%",
    status: "Ativa",
    trimestres: ["Jan-Mar", "Abr-Jun", "Jul-Set", "Out-Dez"],
  },
]

export default function PremiacaoTrimestralPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Configurar Premiação Trimestral</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Premiação Trimestral</CardTitle>
          <CardDescription>Configure uma bonificação extra por atingimento de metas trimestrais.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {premiacoes.map((premiacao) => (
              <div key={premiacao.id} className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">Premiação: {premiacao.valor}</h3>
                    <p className="text-sm text-muted-foreground">
                      Percentual mínimo: {premiacao.percentualMinimo} | Status:{" "}
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 ml-1">
                        {premiacao.status}
                      </Badge>
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2">Períodos de Apuração Trimestral</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Trimestre</TableHead>
                        <TableHead>Meses</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {premiacao.trimestres.map((trimestre, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}º Trimestre</TableCell>
                          <TableCell>{trimestre}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}

            {premiacoes.length === 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="valorPremiacao" className="text-right">
                    Valor da Premiação (R$)
                  </Label>
                  <Input id="valorPremiacao" placeholder="Ex: 5000" className="col-span-3" />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="percentualMinimo" className="text-right">
                    Percentual Mínimo (%)
                  </Label>
                  <Input id="percentualMinimo" placeholder="Ex: 95" className="col-span-3" />
                </div>

                <div className="flex justify-end">
                  <Button>Salvar</Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
