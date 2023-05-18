export function create(context) {
  return {
    ClassDeclaration(node) {
      const numProperties = node.body.body.filter(
        (member) => member.type === 'ClassProperty',
      ).length;
      if (numProperties > context.options[0]) {
        context.report({
          node,
          message: `Class has too many properties. Maximum allowed is ${context.options[0]}.`,
        });
      }
    },
  };
}
export const meta = {
  schema: [
    {
      type: 'integer',
    },
  ],
};
