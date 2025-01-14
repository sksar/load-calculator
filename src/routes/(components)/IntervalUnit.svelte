<script>
  import * as Select from "$lib/components/ui/select";

  let { value } = $props();
</script>

<!-- <Select.Root {selected} multiple={false}>
  <Select.Trigger class="w-[180px]">
    <Select.Value placeholder="Interval Unit" />
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="s">Seconds</Select.Item>
    <Select.Item value="m">Minutes</Select.Item>
    <Select.Item value="h">Hours</Select.Item>
  </Select.Content>
</Select.Root> -->

<select bind:value>
  <option value="s">Seconds</option>
  <option value="m">Minutes</option>
  <option value="h">Hours</option>
</select>
