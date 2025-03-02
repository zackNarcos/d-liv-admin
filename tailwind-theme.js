export default {
  global: {
    fieldset: "max-w-md border border-gray-600 rounded px-2 pb-1",
    help: "text-xs text-gray-500",
    inner: "formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none",
    input: " py-2.5 px-3 rounded-lg appearance-none bg-transparent focus:outline-none focus:ring-0 focus:shadow-none",
    label: "block mb-1 font-medium text-gray-600 text-sm",
    legend: "font-bold text-sm",
    loaderIcon: "inline-flex items-center w-4 text-gray-600 animate-spin",
    message: "text-red-500 mb-1 text-xs",
    messages: "list-none p-0 mt-1 mb-0",
    outer: "mb-4 formkit-disabled:opacity-50",
    prefixIcon:
      "w-10 flex self-stretch grow-0 shrink-0 rounded-tl rounded-bl border-r border-gray-400 bg-white bg-gradient-to-b from-transparent to-gray-200 [&>svg]:w-full [&>svg]:max-w-[1em] [&>svg]:max-h-[1em] [&>svg]:m-auto",
    suffixIcon: "w-7 pr-3 p-3 flex self-stretch grow-0 shrink-0 [&>svg]:w-full [&>svg]:max-w-[1em] [&>svg]:max-h-[1em] [&>svg]:m-auto",
  },
  radio: {
    decorator: "rounded-full",
    decoratorIcon: "w-5 p-[5px]",
  },
  select: {
    inner: "flex relative max-w-md items-center rounded mb-1 ring-1 ring-gray-400 focus-within:ring-blue-500 focus-within:ring-2 [&>span:first-child]:focus-within:text-blue-500",
    input:
      'w-full pl-3 pr-8 py-2 border-none text-base text-gray-700 placeholder-gray-400 formkit-multiple:p-0 data-[placeholder="true"]:text-gray-400 formkit-multiple:data-[placeholder="true"]:text-inherit',
    selectIcon: "flex p-[3px] shrink-0 w-5 mr-2 -ml-[1.5em] h-full pointer-events-none [&>svg]:w-[1em]",
    option: "formkit-multiple:p-3 formkit-multiple:text-sm text-gray-700",
  },
  textarea: {
    inner: "flex max-w-md rounded mb-1 ring-1 ring-gray-400 focus-within:ring-blue-500 [&>label:first-child]:focus-within:text-blue-500",
    input: "block w-full h-32 px-3 py-3 border-none text-base text-gray-700 placeholder-gray-400 focus:shadow-outline",
  },
  "family:button": {
    input:
      "inline-flex items-center border-0 border-green-800 bg-green-800 text-white text-sm font-normal py-3 px-6 rounded-lg focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 formkit-disabled:bg-gray-400 formkit-loading:before:w-4 formkit-loading:before:h-4 formkit-loading:before:mr-2 formkit-loading:before:border formkit-loading:before:border-2 formkit-loading:before:border-r-transparent formkit-loading:before:rounded-3xl formkit-loading:before:border-white formkit-loading:before:animate-spin",
    wrapper: "mb-1",
    prefixIcon: "$reset block w-4 -ml-2 mr-2 stretch",
    suffixIcon: "$reset block w-4 ml-2 stretch",
  },
};
