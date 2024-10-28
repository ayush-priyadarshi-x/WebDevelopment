import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function dashboard() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="flex-1 bg-gray-100 dark:bg-gray-900">
          <div className="p-6 grid gap-6">
            {/* Main Dashboard Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Total Revenue */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$123,123.12</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    20% increase from last month.
                  </p>
                </CardContent>
              </Card>

              {/* Card 2: Subscription */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Subscription
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8,245</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    10% increase from last month.
                  </p>
                </CardContent>
              </Card>

              {/* Card 3: Sales */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3,567</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    15% increase from last month.
                  </p>
                </CardContent>
              </Card>

              {/* Card 4: Active */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Active</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    5% increase from last month.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Table for Recent Signups */}
            <div className="mt-8 bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Recent Signups
                </h2>
              </div>
              <div className="overflow-x-auto">
                <Table className="min-w-full divide-y divide-gray-200">
                  <TableHeader className="bg-gray-50 dark:bg-gray-700">
                    <TableRow>
                      <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Name
                      </TableHead>
                      <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Email
                      </TableHead>
                      <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Plan
                      </TableHead>
                      <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {/* Placeholder rows - add actual data here */}
                    <TableRow>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        John Doe
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        johndoe@example.com
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        Basic
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        2024-10-27
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                        Jane Smith
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        janesmith@example.com
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        Premium
                      </TableCell>
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        2024-10-26
                      </TableCell>
                    </TableRow>
                    {/* Add more rows as needed */}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
