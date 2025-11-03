export interface ICacheProvider {
  
  /**
   * Salva um valor no cache.
   * @param key - A chave única para o cache (ex: 'client:ID_DO_CLIENTE').
   * @param value - O valor a ser salvo (será convertido para string, ex: JSON).
   * @param expiresInSeconds - (Opcional) Tempo em segundos para o cache expirar.
   */
  save(key: string, value: any, expiresInSeconds?: number): Promise<void>;

  /**
   * Recupera um valor do cache.
   * @param key - A chave a ser buscada.
   * @returns O valor (como string) ou nulo se não for encontrado.
   */
  get(key: string): Promise<string | null>;

  /**
   * Deleta um valor do cache (invalidação).
   * @param key - A chave a ser deletada.
   */
  invalidate(key: string): Promise<void>;
}