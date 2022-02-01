import {expect, test} from '@oclif/test'

describe('transfer-list', () => {
  test
  .stdout()
  .command(['transfer-list'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['transfer-list', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
