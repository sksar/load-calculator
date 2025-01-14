<script>
  import Button from "@/components/ui/button/button.svelte";
  import Input from "@/components/ui/input/input.svelte";
  import * as Table from "$lib/components/ui/table/index.js";
  import IntervalUnit from "./(components)/IntervalUnit.svelte";
  import LoadReport from "./(components)/LoadReport.svelte";
  import { calculateLoadStats } from "./calculatorUtils";

  let loads = $state([]);
  let DAU = $state(0);

  let summary = $derived(loads.map((load) => calculateLoadStats(load, DAU)));
  let totalAvgRPS = $derived(
    summary
      .reduce((sum, stat) => sum + Number(stat.avgRequestsPerSecond), 0)
      .toFixed(2)
  );
  let totalPeakRPS = $derived(
    summary.reduce((sum, stat) => sum + stat.peakRequestsPerSecond, 0)
  );

  function addLoad() {
    loads.push({
      name: "",
      userPercentage: 100,
      timeFrom: "00:00",
      timeTo: "23:59",
      interval: 15,
      intervalUnit: "m",
    });
  }

  function deleteLoad(index) {
    loads = loads.filter((_, i) => i !== index);
  }

  function printReport() {
    window.print();
  }
</script>

<div id="calculator-form" class="space-y-6 print:hidden">
  <div class="sm:flex sm:items-center sm:justify-between">
    <div>
      <h1 class="text-2xl font-semibold text-gray-900">API Load Calculator</h1>
      <p class="mt-2 text-sm text-gray-500">
        Calculate and simulate API load patterns for your application.
      </p>
    </div>
  </div>

  <div class="bg-white border rounded-lg">
    <div class="p-6">
      <section id="daily-active-users" class="mb-8">
        <h2 class="text-lg font-medium text-gray-900 mb-4">
          Daily Active Users
        </h2>
        <div class="max-w-xs">
          <Input
            type="number"
            bind:value={DAU}
            class="w-full"
            placeholder="Enter number of users"
          />
        </div>
      </section>

      <section id="loads">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-medium text-gray-900">Load Patterns</h2>
          <Button
            onclick={addLoad}
            class="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add Load Pattern
          </Button>
        </div>

        <div class="border rounded-lg overflow-hidden">
          <div class="overflow-x-auto">
            <Table.Table>
              <Table.TableHeader>
                <Table.Row>
                  <Table.Head
                    class="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >Name</Table.Head
                  >
                  <Table.Head
                    class="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >User %</Table.Head
                  >
                  <Table.Head
                    class="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >Time From</Table.Head
                  >
                  <Table.Head
                    class="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >Time To</Table.Head
                  >
                  <Table.Head
                    class="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >Interval</Table.Head
                  >
                  <Table.Head
                    class="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >Unit</Table.Head
                  >
                  <Table.Head
                    class="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider w-20"
                    >Actions</Table.Head
                  >
                </Table.Row>
              </Table.TableHeader>
              <Table.TableBody>
                {#each loads as load, index}
                  <Table.Row class="hover:bg-gray-50">
                    <Table.Cell>
                      <Input
                        type="text"
                        bind:value={load.name}
                        class="w-full"
                        placeholder="API endpoint"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        type="number"
                        bind:value={load.userPercentage}
                        class="w-24"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        type="time"
                        bind:value={load.timeFrom}
                        class="w-32"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        type="time"
                        bind:value={load.timeTo}
                        class="w-32"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        type="number"
                        bind:value={load.interval}
                        class="w-24"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {load.intervalUnit}
                      <IntervalUnit bind:value={load.intervalUnit} />
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        variant="destructive"
                        size="icon"
                        onclick={() => deleteLoad(index)}
                        class="w-8 h-8 !p-0 text-red-600 hover:text-red-700"
                      >
                        ✕
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                {/each}
              </Table.TableBody>
            </Table.Table>
          </div>
        </div>
      </section>
    </div>
  </div>

  {#if summary.length > 0}
    <div class="mt-8">
      <LoadReport
        {summary}
        {DAU}
        {totalAvgRPS}
        {totalPeakRPS}
        className="print:shadow-none print:border-0"
      />
    </div>

    <div class="print:hidden mt-4 flex justify-end">
      <Button
        onclick={printReport}
        class="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Print Report
      </Button>
    </div>
  {/if}
</div>
