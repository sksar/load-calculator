<script>
  import * as Select from "$lib/components/ui/select";

  let { value = $bindable("m") } = $props();
  const map = {
    s: "Seconds",
    m: "Minutes",
    h: "Hours",
  };
</script>

<Select.Root required type="single" bind:value>
  <Select.Trigger class="w-[180px]">
    {map[value] || "Interval Unit"}
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="s">Seconds</Select.Item>
    <Select.Item value="m">Minutes</Select.Item>
    <Select.Item value="h">Hours</Select.Item>
  </Select.Content>
</Select.Root>
