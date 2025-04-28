import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Search, Plus } from "lucide-react"

const vendedores = [
  { codigo: "V001", nome: "Ana Silva", comissionado: true },
  { codigo: "V002", nome: "Bruno Santos", comissionado: true },
  { codigo: "V003", nome: "Carla Oliveira", comissionado: true },
  { codigo: "V004", nome: "Daniel Pereira", comissionado: false },
  { codigo: "V005", nome: "Eduardo Costa", comissionado: true },
  { codigo: "V006", nome: "Fernanda Lima", comissionado: true },
  { codigo: "V007", nome: "Gabriel Souza", comissionado: false },
  { codigo: "V008", nome: "Helena Martins", comissionado: true },
]

export default function VendedoresPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Configurar Vendedores</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Vendedor
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vendedores</CardTitle>
          <CardDescription>Configure quais vendedores serão comissionados.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar vendedor..." className="pl-8" />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="text-right">Comissionado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendedores.map((vendedor) => (
                <TableRow key={vendedor.codigo}>
                  <TableCell className="font-medium">{vendedor.codigo}</TableCell>
                  <TableCell>{vendedor.nome}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Switch id={`comissionado-${vendedor.codigo}`} defaultChecked={vendedor.comissionado} />
                      <Label htmlFor={`comissionado-${vendedor.codigo}`} className="sr-only">
                        Comissionado
                      </Label>
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
