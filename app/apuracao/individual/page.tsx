import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApuracaoIndividualChart } from "@/components/apuracao-individual-chart"

export default function ApuracaoIndividualPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Apuração Individual</h1>
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
        <Button>Visualizar</Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Apuração Individual - Ana Silva</CardTitle>
            <CardDescription>Apuração: AP-2025-03 | Período: 01/03/2025 a 31/03/2025</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Exportar Relatório
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <div className="bg-slate-100 p-3 rounded-full">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Ana Silva</h3>
              <p className="text-sm text-muted-foreground">Código: V001</p>
            </div>
          </div>

          <Tabs defaultValue="resumo">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="resumo">Resumo</TabsTrigger>
              <TabsTrigger value="produtos">Produtos</TabsTrigger>
              <TabsTrigger value="grafico">Gráfico</TabsTrigger>
            </TabsList>
            <TabsContent value="resumo" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Valor Produzido</h3>
                  <p className="text-2xl font-bold">R$ 45.000,00</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Comissão</h3>
                  <p className="text-2xl font-bold">R$ 1.350,00</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Premiação Trimestral</h3>
                  <p className="text-2xl font-bold">R$ 1.000,00</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Total</h3>
                  <p className="text-2xl font-bold">R$ 2.350,00</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="produtos" className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead className="text-right">Valor Produzido</TableHead>
                    <TableHead className="text-right">% Comissão</TableHead>
                    <TableHead className="text-right">Valor Comissão</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">PF Participativo</TableCell>
                    <TableCell className="text-right">R$ 25.000,00</TableCell>
                    <TableCell className="text-right">3%</TableCell>
                    <TableCell className="text-right">R$ 750,00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Migração</TableCell>
                    <TableCell className="text-right">R$ 10.000,00</TableCell>
                    <TableCell className="text-right">1.5%</TableCell>
                    <TableCell className="text-right">R$ 150,00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">PJ Empresarial</TableCell>
                    <TableCell className="text-right">R$ 8.000,00</TableCell>
                    <TableCell className="text-right">3.5%</TableCell>
                    <TableCell className="text-right">R$ 280,00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Opcional</TableCell>
                    <TableCell className="text-right">R$ 2.000,00</TableCell>
                    <TableCell className="text-right">4%</TableCell>
                    <TableCell className="text-right">R$ 80,00</TableCell>
                  </TableRow>
                  <TableRow className="font-medium">
                    <TableCell>Total</TableCell>
                    <TableCell className="text-right">R$ 45.000,00</TableCell>
                    <TableCell className="text-right"></TableCell>
                    <TableCell className="text-right">R$ 1.350,00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="grafico" className="pt-4">
              <ApuracaoIndividualChart />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
