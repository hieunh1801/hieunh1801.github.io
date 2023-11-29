```ts
Object.entries(cartItem.sku.attributes)?.map(
  ([attributeKey, attributeValue]) => {
    return (
      <div key={attributeKey}>
        {attributeKey}: {attributeValue}
      </div>
    );
  }
);
```
