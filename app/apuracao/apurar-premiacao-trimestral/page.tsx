import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ApurarPremiacaoTrimestralPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Apurar Premiação Trimestral</h1>
      </div>

      <div className="flex items-center gap-4 max-w-xl">
        <Select defaultValue="T1-2025">
          <SelectTrigger>
            <SelectValue placeholder="Selecione o trimestre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="T1-2025">1º Trimestre 2025 (Jan-Mar)</SelectItem>
            <SelectItem value="T4-2024">4º Trimestre 2024 (Out-Dez)</SelectItem>
            <SelectItem value="T3-2024">3º Trimestre 2024 (Jul-Set)</SelectItem>
          </SelectContent>
        </Select>
        <Button>Calcular Premiação</Button>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Informação</AlertTitle>
        <AlertDescription>
          A premiação trimestral é calculada com base no atingimento de meta dos três meses do trimestre. O percentual
          mínimo configurado para premiação é de 95%.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Premiação Trimestral - 1º Trimestre 2025</CardTitle>
          <CardDescription>Período: Janeiro a Março/2025</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Resultado da Apuração</h3>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> Exportar
            </Button>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Atingimento Trimestral</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mês</TableHead>
                  <TableHead className="text-right">Meta</TableHead>
                  <TableHead className="text-right">Realizado</TableHead>
                  <TableHead className="text-right">% Atingido</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Janeiro/2025</TableCell>
                  <TableCell className="text-right">R$ 200.000,00</TableCell>
                  <TableCell className="text-right">R$ 180.000,00</TableCell>
                  <TableCell className="text-right">90%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fevereiro/2025</TableCell>
                  <TableCell className="text-right">R$ 200.000,00</TableCell>
                  <TableCell className="text-right">R$ 220.000,00</TableCell>
                  <TableCell className="text-right">110%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Março/2025</TableCell>
                  <TableCell className="text-right">R$ 220.000,00</TableCell>
                  <TableCell className="text-right">R$ 240.000,00</TableCell>
                  <TableCell className="text-right">109%</TableCell>
                </TableRow>
                <TableRow className="font-medium">
                  <TableCell>Total Trimestre</TableCell>
                  <TableCell className="text-right">R$ 620.000,00</TableCell>
                  <TableCell className="text-right">R$ 640.000,00</TableCell>
                  <TableCell className="text-right">103%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="text-lg font-semibold">Resultado da Premiação</h3>
              <p className="text-sm text-muted-foreground">
                Percentual mínimo configurado: 95% | Percentual atingido: 103%
              </p>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 text-lg py-1 px-3">
              PREMIAÇÃO APROVADA
            </Badge>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Distribuição da Premiação</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Vendedor</TableHead>
                  <TableHead className="text-right">Valor da Premiação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">V001</TableCell>
                  <TableCell>Ana Silva</TableCell>
                  <TableCell className="text-right">R$ 1.000,00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">V002</TableCell>
                  <TableCell>Bruno Santos</TableCell>
                  <TableCell className="text-right">R$ 1.000,00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">V003</TableCell>
                  <TableCell>Carla Oliveira</TableCell>
                  <TableCell className="text-right">R$ 1.000,00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">V005</TableCell>
                  <TableCell>Eduardo Costa</TableCell>
                  <TableCell className="text-right">R$ 1.000,00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">V006</TableCell>
                  <TableCell>Fernanda Lima</TableCell>
                  <TableCell className="text-right">R$ 1.000,00</TableCell>
                </TableRow>
                <TableRow className="font-medium">
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell className="text-right">R$ 5.000,00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
