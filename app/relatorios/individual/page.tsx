import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, FileSpreadsheet } from "lucide-react"

export default function RelatoriosIndividualPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Relatório de Resultado Individual</h1>
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
        <Select defaultValue="V001">
          <SelectTrigger>
            <SelectValue placeholder="Selecione o vendedor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="V001">Ana Silva</SelectItem>
            <SelectItem value="V002">Bruno Santos</SelectItem>
            <SelectItem value="V003">Carla Oliveira</SelectItem>
            <SelectItem value="V005">Eduardo Costa</SelectItem>
            <SelectItem value="V006">Fernanda Lima</SelectItem>
            <SelectItem value="V008">Helena Martins</SelectItem>
          </SelectContent>
        </Select>
        <Button>
          <FileSpreadsheet className="mr-2 h-4 w-4" /> Gerar Relatório
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Relatório Individual - Ana Silva</CardTitle>
          <CardDescription>Apuração: AP-2025-03 | Período: 01/03/2025 a 31/03/2025</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">ID de Apuração</h3>
              <p className="font-medium">AP-2025-03</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Ano de Apuração</h3>
              <p className="font-medium">2025</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Data Inicial</h3>
              <p className="font-medium">01/03/2025</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Data Final</h3>
              <p className="font-medium">31/03/2025</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Nome do Vendedor</h3>
              <p className="font-medium">Ana Silva</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Código de Vendedor</h3>
              <p className="font-medium">V001</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Detalhamento por Produto</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-right">Realizado</TableHead>
                  <TableHead className="text-right">Comissão</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">PF Participativo</TableCell>
                  <TableCell className="text-right">R$ 25.000,00</TableCell>
                  <TableCell className="text-right">R$ 750,00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Migração</TableCell>
                  <TableCell className="text-right">R$ 10.000,00</TableCell>
                  <TableCell className="text-right">R$ 150,00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">PJ Empresarial</TableCell>
                  <TableCell className="text-right">R$ 8.000,00</TableCell>
                  <TableCell className="text-right">R$ 280,00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Opcional</TableCell>
                  <TableCell className="text-right">R$ 2.000,00</TableCell>
                  <TableCell className="text-right">R$ 80,00</TableCell>
                </TableRow>
                <TableRow className="font-medium">
                  <TableCell>Total</TableCell>
                  <TableCell className="text-right">R$ 45.000,00</TableCell>
                  <TableCell className="text-right">R$ 1.350,00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Soma Total de Comissão</h3>
              <p className="font-medium">R$ 1.350,00</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Total de Premiação Trimestral</h3>
              <p className="font-medium">R$ 1.000,00</p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button>
              <Download className="mr-2 h-4 w-4" /> Exportar XLSX
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
