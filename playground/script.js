const $ = (selector, root = document) => root.querySelector(selector);
const formatOutput = (value) => {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
};

const showResult = (element, message, value) => {
  element.className = 'result-box result-success';
  element.innerHTML = `<strong>Success</strong>\n${message}\n${value !== undefined ? formatOutput(value) : ''}`;
};

const showError = (element, message) => {
  element.className = 'result-box result-error';
  element.innerHTML = `<strong>Error</strong>\n${message}`;
};

const parseInput = (raw) => {
  const trimmed = raw.trim();
  if (trimmed === '') return null;
  try {
    return JSON.parse(trimmed);
  } catch {
    return trimmed;
  }
};

const required = (value, name = 'value') => {
  if (value === null || value === undefined) {
    throw new Error(`${name} is required`);
  }
  return value;
};

const isPlainObject = (value) => {
  return Object.prototype.toString.call(value) === '[object Object]';
};

const hasOwn = (object, key) => {
  if (object === null || object === undefined) {
    return false;
  }
  return Object.prototype.hasOwnProperty.call(object, key);
};

const toArray = (value) => {
  if (value === null || value === undefined) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
};

const safeJsonParse = (value, fallback = null) => {
  if (typeof value !== 'string') {
    return fallback;
  }
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const assertFiniteNumber = (value, name = 'value') => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`${name} must be a finite number`);
  }
  return value;
};

const withTimeout = (promise, ms, message = `Operation timed out after ${ms} ms`) => {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(message)), ms);
  });
  return Promise.race([Promise.resolve(promise), timeoutPromise]).finally(() => {
    clearTimeout(timeoutId);
  });
};

const assertOneOf = (value, options, name = 'value') => {
  if (!Array.isArray(options) || options.length === 0) {
    throw new Error('options must be a non-empty array');
  }
  if (!options.includes(value)) {
    throw new Error(`${name} must be one of: ${options.join(', ')}`);
  }
  return value;
};

const setupRequired = () => {
  const input = $('#required-input');
  const output = $('#required-output');
  $('#required-run').addEventListener('click', () => {
    const raw = input.value.trim();
    if (raw === '' || raw === 'null' || raw === 'undefined') {
      showError(output, 'Value is missing or null-like.');
      return;
    }
    try {
      const result = required(raw, 'value');
      showResult(output, 'Value is present.', result);
    } catch (error) {
      showError(output, error.message);
    }
  });
};

const setupIsPlainObject = () => {
  const input = $('#isPlainObject-input');
  const output = $('#isPlainObject-output');
  $('#isPlainObject-run').addEventListener('click', () => {
    const value = parseInput(input.value);
    const isObject = isPlainObject(value);
    showResult(output, isObject ? 'Input is a plain object.' : 'Input is not a plain object.', value);
  });
};

const setupHasOwn = () => {
  const objectInput = $('#hasOwn-input');
  const keyInput = $('#hasOwn-key');
  const output = $('#hasOwn-output');
  $('#hasOwn-run').addEventListener('click', () => {
    const raw = objectInput.value.trim();
    let object;
    try {
      object = raw === '' ? null : JSON.parse(raw);
    } catch {
      showError(output, 'Invalid JSON object.');
      return;
    }
    if (!isPlainObject(object)) {
      showError(output, 'Input must be a plain object.');
      return;
    }
    const key = keyInput.value.trim();
    if (!key) {
      showError(output, 'Property name is required.');
      return;
    }
    const result = hasOwn(object, key);
    showResult(output, `Property check for ${key}:`, result);
  });
};

const setupToArray = () => {
  const input = $('#toArray-input');
  const output = $('#toArray-output');
  $('#toArray-run').addEventListener('click', () => {
    const raw = input.value.trim();
    const value = raw === '' ? null : parseInput(raw);
    const result = toArray(value);
    showResult(output, 'Normalized value to array.', result);
  });
};

const setupSafeJsonParse = () => {
  const input = $('#safeJsonParse-input');
  const output = $('#safeJsonParse-output');
  $('#safeJsonParse-run').addEventListener('click', () => {
    const raw = input.value;
    const result = safeJsonParse(raw, null);
    if (result === null) {
      showError(output, 'Invalid JSON. Returned fallback null.');
      return;
    }
    showResult(output, 'Parsed JSON successfully.', result);
  });
};

const setupAssertFiniteNumber = () => {
  const input = $('#assertFiniteNumber-input');
  const output = $('#assertFiniteNumber-output');
  $('#assertFiniteNumber-run').addEventListener('click', () => {
    const raw = input.value.trim();
    const value = Number(raw);
    if (raw === '' || Number.isNaN(value)) {
      showError(output, 'Please enter a valid number.');
      return;
    }
    try {
      const result = assertFiniteNumber(value, 'number');
      showResult(output, 'Valid finite number.', result);
    } catch (error) {
      showError(output, error.message);
    }
  });
};

const setupWithTimeout = () => {
  const delaySelect = $('#withTimeout-delay');
  const timeoutSelect = $('#withTimeout-timeout');
  const output = $('#withTimeout-output');
  const button = $('#withTimeout-run');
  $('#withTimeout-run').addEventListener('click', async () => {
    const delay = Number(delaySelect.value);
    const timeout = Number(timeoutSelect.value);

    button.disabled = true;
    showResult(output, 'Running async task...', null);

    try {
      const result = await withTimeout(
        new Promise((resolve) => setTimeout(() => resolve({ status: 'completed', delay }), delay)),
        timeout,
      );
      showResult(output, 'The async task finished before timeout.', result);
    } catch (error) {
      showError(output, error.message);
    } finally {
      button.disabled = false;
    }
  });
};

const setupAssertOneOf = () => {
  const input = $('#assertOneOf-input');
  const output = $('#assertOneOf-output');
  const options = ['pending', 'paid', 'failed'];
  $('#assertOneOf-run').addEventListener('click', () => {
    const value = input.value.trim();
    try {
      const result = assertOneOf(value, options, 'status');
      showResult(output, 'Valid status value.', result);
    } catch (error) {
      showError(output, error.message);
    }
  });
};

const init = () => {
  setupRequired();
  setupIsPlainObject();
  setupHasOwn();
  setupToArray();
  setupSafeJsonParse();
  setupAssertFiniteNumber();
  setupWithTimeout();
  setupAssertOneOf();
};

init();
