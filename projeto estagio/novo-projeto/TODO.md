# TODO - Buscar componentes na internet

- [ ] Atualizar `docker-compose.yml` para passar `COMPONENT_MARKETPLACE_SOURCES` ao serviço `backend`.
- [ ] Definir (ex.: via `.env`/docker compose) as URLs de feeds/APIs JSON externos que retornem `[{...}]` ou `{ components: [...] }`.
- [ ] Validar o formato do JSON de cada fonte contra `normalizeComponentItem()`.
- [ ] Opcional: adicionar logs/timeout/headers para ajudar a depurar falhas em `fetchRemoteComponents()`.
- [ ] Testar `GET /api/components` e confirmar que o frontend `src/pages/Components.jsx` renderiza corretamente.

