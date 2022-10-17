# Renderização

## Quando um componente renderiza

- Quando o componente pai renderiza
- Quando um hook atualiza alguma info (useState, useContext, useReducer)
- Quando uma prop atualiza

## Etapas

- Cria uma nova versão do componente
- Compara a nova versão com a versão antiga
- Caso tenha mudanças, atualiza onde mudou (utilizando a sintaxe de reconciliation)

## Memo

O React.memo faz com que o render não crie a nova versão do componente caso as props estejam iguais as anteriores.
Por padrão, o React.memo faz um shallow compare (===), o que faz com que a comparação entre objetos sempre retorne false, pois {} não é igual a {} (as referencias não são iguais). Por isso, o React.memo aceita um segundo parâmetro que é uma função que indica se as props são iguais ou não.

```jsx
React.memo(Component, (prevProps, nextProps) => {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
});
```

### Quando usar o memo

- Pure Functional Components

  Pure functions são funções que dados os mesmos parâmetros retornam o mesmo resultado. Ex.: se a função retorna um 'há x horas', essa info muda de acordo com a data/horário em que ela é chamada, portanto, não é uma pure function.

- Components that render too often

  Componentes que renderizam de mais. É possível observar isso com o Profiler do React Dev Tools.

- Re-renders with same props

  Quando o componente renderiza muitas vezes com as mesmas props, é interessante usar o memo.
  É importante lembrar que por mais que os processos do render nao aconteça, a comparação do memo é executada no lugar do render, então em casos que o componente é renderizado muitas vezes, mas com props diferentes, é melhor deixar o render acontecer.

- Medium to Big size

  Dependendo da complexidade do componente, em componentes muito pequenos por exemplo, pode ser que o custo para fazer a comparação do React.memo seja bem parecido com o custo do render gerar uma nova versão do componente e comparar com a antiga, portanto, é melhor deixar o render fazer o trabalho.
