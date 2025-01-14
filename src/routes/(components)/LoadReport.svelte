<script>
  import * as Table from "$lib/components/ui/table/index.js";

  let { summary, DAU, totalAvgRPS, totalPeakRPS, class: className } = $props();

  // Calculate overall score
  let overallScore = $derived({
    value: Math.min(100, Math.round((totalAvgRPS / (DAU || 1)) * 100)),
    label: (score) => {
      if (score < 30) return "Low Load";
      if (score < 70) return "Moderate Load";
      return "High Load";
    },
  });
</script>

<div class="bg-white border rounded-lg p-6 {className}">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <div
      class="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200"
    >
      <p class="text-sm text-blue-600 font-medium">Overall Load Score</p>
      <div class="flex items-baseline mt-1">
        <p class="text-2xl font-bold text-blue-900">{overallScore.value}%</p>
        <p class="ml-2 text-sm text-blue-600">
          {overallScore.label(overallScore.value)}
        </p>
      </div>
    </div>
    <div
      class="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200"
    >
      <p class="text-sm text-green-600 font-medium">Average Load</p>
      <p class="text-2xl font-bold text-green-900 mt-1">{totalAvgRPS} req/s</p>
    </div>
    <div
      class="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200"
    >
      <p class="text-sm text-orange-600 font-medium">Peak Load</p>
      <p class="text-2xl font-bold text-orange-900 mt-1">
        {totalPeakRPS} req/s
      </p>
    </div>
  </div>

  <div class="border rounded-lg overflow-hidden">
    <Table.Table>
      <Table.TableHeader>
        <Table.Row>
          <Table.Head
            class="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider"
            >Pattern Name</Table.Head
          >
          <Table.Head
            class="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider"
            >Active Users</Table.Head
          >
          <Table.Head
            class="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider"
            >Avg Req/sec</Table.Head
          >
          <Table.Head
            class="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider"
            >Avg Req/min</Table.Head
          >
          <Table.Head
            class="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider"
            >Peak Req/sec</Table.Head
          >
          <Table.Head
            class="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider"
            >Peak Req/min</Table.Head
          >
        </Table.Row>
      </Table.TableHeader>
      <Table.TableBody>
        {#each summary as stat}
          <Table.Row class="hover:bg-gray-50">
            <Table.Cell>{stat.name || "Unnamed Pattern"}</Table.Cell>
            <Table.Cell>{stat.activeUsers}</Table.Cell>
            <Table.Cell>{stat.avgRequestsPerSecond}</Table.Cell>
            <Table.Cell>{stat.avgRequestsPerMinute}</Table.Cell>
            <Table.Cell>{stat.peakRequestsPerSecond}</Table.Cell>
            <Table.Cell>{stat.peakRequestsPerMinute}</Table.Cell>
          </Table.Row>
        {/each}
        <Table.Row class="bg-gray-50 font-medium">
          <Table.Cell>Total</Table.Cell>
          <Table.Cell>{DAU}</Table.Cell>
          <Table.Cell>{totalAvgRPS}</Table.Cell>
          <Table.Cell>{(totalAvgRPS * 60).toFixed(2)}</Table.Cell>
          <Table.Cell>{totalPeakRPS}</Table.Cell>
          <Table.Cell>{totalPeakRPS * 60}</Table.Cell>
        </Table.Row>
      </Table.TableBody>
    </Table.Table>
  </div>
</div>

<style>
  @media print {
    :global(header),
    :global(footer),
    :global(#calculator-form) {
      display: none !important;
    }

    :global(body) {
      padding: 0;
      margin: 0;
    }

    :global(main) {
      padding: 0 !important;
    }

    :global(*) {
      print-color-adjust: exact !important;
      -webkit-print-color-adjust: exact !important;
    }
  }
</style>
