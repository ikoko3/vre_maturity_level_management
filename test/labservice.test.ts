import test from 'node:test';
import assert from 'node:assert/strict';
import { mock } from 'node:test';

import { labService } from '../src/services/labservice.ts';
import { Lab } from '../src/models/lab.model.ts';
import { LevelConfiguration } from '../src/models/condition_configuration.ts';
import { LabLevel, LabLevelState } from '../src/const/lab.const.ts';
import { ConditionStatus, ConditionCategory, ConditionType } from '../src/const/condition.const.ts';


test('registerLab creates lab with initial level and exit conditions', async (t) => {
  t.after(() => mock.restoreAll());

  const exitConditionsConfig = [
    { category: ConditionCategory.LabLevelProgression, type: ConditionType.PlanFeasibility, tooltip_url: 'url' }
  ];
  mock.method(LevelConfiguration, 'findOne', () => ({
    lean: () => ({ exit_conditions: exitConditionsConfig })
  }));

  const saveMock = mock.fn(async function () { return this; });
  mock.method(Lab.prototype, 'save', saveMock);

  const lab = await labService.registerLab({
    name: 'Test Lab',
    alias: 'TL',
    parent_lab_id: 'parent',
    parent_lab_level: LabLevel.Zero
  });

  assert.equal(saveMock.mock.callCount(), 1);
  assert.equal(lab.current_level, LabLevel.Zero);
  assert.equal(lab.levels[0].level, LabLevel.Zero);
  assert.equal(lab.levels[0].state, LabLevelState.InDevelopment);
  assert.equal(lab.levels[0].exit_conditions.length, exitConditionsConfig.length);
  assert.equal(lab.levels[0].exit_conditions[0].status, ConditionStatus.Unknown);
});


test('updateExitCondition updates an existing condition', async (t) => {
  t.after(() => mock.restoreAll());

  const labDoc = {
    levels: [
      {
        level: LabLevel.Zero,
        state: LabLevelState.InDevelopment,
        reached_at: new Date(),
        exit_conditions: [
          { _id: 'cond1', status: ConditionStatus.Unknown, category: 1, type: 2, tooltip_url: '', comments: '', discussion_url: '' }
        ]
      }
    ],
    save: mock.fn(async function () {})
  } as any;

  mock.method(Lab, 'findById', async () => labDoc);

  const result = await labService.updateExitCondition('labId', 'cond1', { status: ConditionStatus.Verified, comments: 'done', discussion_url: '' });

  assert.equal(result.status, ConditionStatus.Verified);
  assert.equal(labDoc.levels[0].exit_conditions[0].status, ConditionStatus.Verified);
  assert.equal(labDoc.save.mock.callCount(), 1);
});

