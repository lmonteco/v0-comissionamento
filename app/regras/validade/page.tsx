import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { NovaRegraDialog } from "@/components/nova-regra-dialog"

const regras = [
  {
    id: "R-2025-02",
    dataInicio: "01/04/2025",
    dataFim: null,
    status: "Ativa",
    apuracoes: 0,
  },
  {
    id: "R-2025-01",
    dataInicio: "01/01/2025",
    dataFim: "31/03/2025",
    status: "Inativa",
    apuracoes: 3,
  },
  {
    id: "R-2024-02",
    dataInicio: "01/07/2024",
    dataFim: "31/12/2024",
    status: "Inativa",
    apuracoes: 6,
  },
  {
    id: "R-2024-01",
    dataInicio: "01/01/2024",
    dataFim: "30/06/2024",
    status: "Inativa",
    apuracoes: 6,
  },
]

export default function ValidadePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Configurar Validade de Regras</h1>
        <NovaRegraDialog />
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Atenção</AlertTitle>
        <AlertDescription>
          Não é possível ter mais de uma regra ativa ao mesmo tempo. Ao criar uma nova regra, a regra atual será
          automaticamente encerrada.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Regras de Comissionamento</CardTitle>
          <CardDescription>Defina o período de validade das regras de comissionamento.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Data Início</TableHead>
                <TableHead>Data Fim</TableHead>
                <TableHead>Apurações</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regras.map((regra) => (
                <TableRow key={regra.id}>
                  <TableCell className="font-medium">{regra.id}</TableCell>
                  <TableCell>{regra.dataInicio}</TableCell>
                  <TableCell>{regra.dataFim || "Em vigor"}</TableCell>
                  <TableCell>{regra.apuracoes}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="outline"
                      className={
                        regra.status === "Ativa"
                          ? "bg-green-50 text-green-700 hover:bg-green-50"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-100"
                      }
                    >
                      {regra.status}
                    </Badge>
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
