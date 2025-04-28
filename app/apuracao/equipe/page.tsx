import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"
import { ApuracaoEquipeChart } from "@/components/apuracao-equipe-chart"

export default function ApuracaoEquipePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Apuração da Equipe</h1>
      </div>

      <div className="flex items-center gap-4 max-w-xl">
        <Select defaultValue="AP-2025-03">
          <SelectTrigger>
            <SelectValue placeholder="Selecione a apuração" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AP-2025-04">Abril/2025</SelectItem>
            <SelectItem value="AP-2025-03">Março/2025</SelectItem>
            <SelectItem value="AP-2025-02">Fevereiro/2025</SelectItem>
            <SelectItem value="AP-2025-01">Janeiro/2025</SelectItem>
            <SelectItem value="AP-2024-12">Dezembro/2024</SelectItem>
          </SelectContent>
        </Select>
        <Button>Visualizar</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Resumo da Apuração - Março/2025</CardTitle>
            <CardDescription>Apuração: AP-2025-03 | Período: 01/03/2025 a 31/03/2025</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Meta</h3>
                <p className="text-2xl font-bold">R$ 220.000,00</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Realizado</h3>
                <p className="text-2xl font-bold">R$ 240.000,00</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Percentual Atingido</h3>
                <p className="text-2xl font-bold">109%</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Categoria</h3>
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 text-lg py-1 px-3">
                  Superação
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Total de Comissão</h3>
                <p className="text-2xl font-bold">R$ 7.200,00</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Premiação Trimestral</h3>
                <p className="text-2xl font-bold">R$ 5.000,00</p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" /> Exportar Relatório
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Produto</CardTitle>
            <CardDescription>Valores realizados por categoria de produto</CardDescription>
          </CardHeader>
          <CardContent>
            <ApuracaoEquipeChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalhamento por Vendedor</CardTitle>
          <CardDescription>Resultado individual de cada vendedor comissionado</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead className="text-right">Valor Produzido</TableHead>
                <TableHead className="text-right">Comissão</TableHead>
                <TableHead className="text-right">Premiação Trimestral</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">V001</TableCell>
                <TableCell>Ana Silva</TableCell>
                <TableCell className="text-right">R$ 45.000,00</TableCell>
                <TableCell className="text-right">R$ 1.350,00</TableCell>
                <TableCell className="text-right">R$ 1.000,00</TableCell>
                <TableCell className="text-right">R$ 2.350,00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">V002</TableCell>
                <TableCell>Bruno Santos</TableCell>
                <TableCell className="text-right">R$ 38.000,00</TableCell>
                <TableCell className="text-right">R$ 1.140,00</TableCell>
                <TableCell className="text-right">R$ 1.000,00</TableCell>
                <TableCell className="text-right">R$ 2.140,00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">V003</TableCell>
                <TableCell>Carla Oliveira</TableCell>
                <TableCell className="text-right">R$ 52.000,00</TableCell>
                <TableCell className="text-right">R$ 1.560,00</TableCell>
                <TableCell className="text-right">R$ 1.000,00</TableCell>
                <TableCell className="text-right">R$ 2.560,00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">V005</TableCell>
                <TableCell>Eduardo Costa</TableCell>
                <TableCell className="text-right">R$ 35.000,00</TableCell>
                <TableCell className="text-right">R$ 1.050,00</TableCell>
                <TableCell className="text-right">R$ 1.000,00</TableCell>
                <TableCell className="text-right">R$ 2.050,00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">V006</TableCell>
                <TableCell>Fernanda Lima</TableCell>
                <TableCell className="text-right">R$ 42.000,00</TableCell>
                <TableCell className="text-right">R$ 1.260,00</TableCell>
                <TableCell className="text-right">R$ 1.000,00</TableCell>
                <TableCell className="text-right">R$ 2.260,00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">V008</TableCell>
                <TableCell>Helena Martins</TableCell>
                <TableCell className="text-right">R$ 28.000,00</TableCell>
                <TableCell className="text-right">R$ 840,00</TableCell>
                <TableCell className="text-right">R$ 0,00</TableCell>
                <TableCell className="text-right">R$ 840,00</TableCell>
              </TableRow>
              <TableRow className="font-medium">
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell className="text-right">R$ 240.000,00</TableCell>
                <TableCell className="text-right">R$ 7.200,00</TableCell>
                <TableCell className="text-right">R$ 5.000,00</TableCell>
                <TableCell className="text-right">R$ 12.200,00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
